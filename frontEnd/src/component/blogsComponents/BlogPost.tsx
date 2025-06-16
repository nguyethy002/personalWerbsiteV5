import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import LoadingBar from "../globalComponents/LoadingBar";

interface Post {
  _id: string;
  title: string;
  content: string;
  date: string;
}

const BlogPost: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        if (!id) {
          throw new Error("Post ID is missing.");
        }

        console.log("Fetching post with ID:", id);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/posts/${id}`, // ✅ Fixed here
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        setPost(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching post:", err);
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            setError("Post not found");
          } else {
            setError(`Failed to connect to server: ${err.message}`);
          }
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleBack = () => navigate("/blog");

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <button
        onClick={handleBack}
        style={{
          padding: "8px 16px",
          marginBottom: "20px",
          cursor: "pointer",
          backgroundColor: "#f97216",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Back to Blog List
      </button>

      {loading && <LoadingBar />}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && post && (
        <article>
          <h1 style={{ fontSize: "2em", marginBottom: "16px" }}>{post.title}</h1>
          <p style={{ color: "#666", marginBottom: "24px" }}>
            {new Date(post.date).toLocaleDateString()}
          </p>
          <div
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: "1.6",
              fontSize: "1.1em",
            }}
          >
            {post.content}
          </div>
        </article>
      )}
    </div>
  );
};

export default BlogPost;
