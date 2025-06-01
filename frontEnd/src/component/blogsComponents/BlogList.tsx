import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/blogs/BlogList.sass";
import { Link } from "react-router-dom";

interface Post {
  _id: string;
  title: string;
  content: string;
  date: string;
}

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  // ✅ Only show delete if running on localhost
  const isAdmin = window.location.hostname === "localhost";

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/posts`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.error("Error fetching posts", error));
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
    <div>
      <h1>All Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Link to={`/blog/${post._id}`}>
              <h3>{post.title}</h3>
              <p>{post.content.substring(0, 150)}...</p>
              <small>{new Date(post.date).toLocaleDateString()}</small>
            </Link>
            {isAdmin && (
              <button onClick={() => deletePost(post._id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
