import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPost = { title, content };

    console.log("Creating post:", newPost);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost); // ✅ Fixed path

      navigate("/blog"); // Redirect after successful creation
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error response:", error.response);
        alert(`Error: ${error.response?.data || error.message}`);
      } else {
        console.error("Unknown error:", error);
        alert("An unexpected error occurred");
      }
    }
  };

  const handleGoBack = () => {
    navigate("/blog");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <button onClick={handleGoBack} style={{ marginTop: "10px" }}>
        Go Back
      </button>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "8px",
            }}
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: "100%",
              minHeight: "200px",
              padding: "8px",
              marginTop: "8px",
              marginBottom: "16px",
              resize: "vertical",
            }}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
