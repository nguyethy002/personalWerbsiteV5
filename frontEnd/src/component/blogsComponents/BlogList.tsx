import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/blogs/BlogList.sass";

interface Post {
  _id: string; // Add _id for MongoDB document ID
  title: string;
  content: string;
  date: string;
}

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch all posts when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.error("Error fetching posts", error));
  }, []);

  // Function to delete a post
  const deletePost = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);

      // Remove the post from the local state
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
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>{new Date(post.date).toLocaleDateString()}</small>
            <button onClick={() => deletePost(post._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <a href="/create">Create New Post</a>
    </div>
  );
};

export default BlogList;
