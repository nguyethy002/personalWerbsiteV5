import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/blogs/BlogList.sass";
import { Link } from "react-router-dom";
import LoadingBar from "../globalComponents/LoadingBar";

interface Post {
  _id: string;
  title: string;
  content: string;
  date: string;
}

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Only show delete if running on localhost
  const isAdmin = window.location.hostname === "localhost";

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/posts`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.error("Error fetching posts", error))
      .finally(() => setLoading(false));
  }, []);

  const deletePost = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post", error);
      alert("Error deleting post");
    }
  };

  return (
    <div className="blog-container">
      <h1>All Blog Posts</h1>

      {loading ? (
        <LoadingBar />
      ) : (
        <ul className="blog-list">
          {posts.map((post) => (
            <li key={post._id} className="blog-card">
              <Link to={`/blog/${post._id}`}>
                <h3>{post.title}</h3>
                <div className="blog-content">
                  <p>{post.content}</p>
                  <small>{new Date(post.date).toLocaleDateString()}</small>
                </div>
              </Link>
              {isAdmin && (
                <button onClick={() => deletePost(post._id)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogList;
