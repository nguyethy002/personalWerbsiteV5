import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPost = { title, content };

    console.log(newPost);

    try {
      // Make sure the URL matches the backend API
      await axios.post("http://localhost:5000/api/posts", newPost);

      // Navigate back to the blog list page after creation
      navigate("/blog"); // Change '/blog' to match your blog list route
    } catch (error) {
      console.error(error); // Log the error for debugging
      alert("Error creating post");
    }
  };

  const handleGoBack = () => {
    navigate("/blog"); // Navigate back to the blog list page
  };

  return (
    <div>
      <button onClick={handleGoBack} style={{ marginTop: "10px" }}>
        Go Back
      </button>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
