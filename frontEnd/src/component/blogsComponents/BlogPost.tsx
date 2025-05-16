import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Post {
  _id: string;
  title: string;
  content: string;
  date: string;
}

const BlogPost: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => console.error("Error fetching post", error));
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="blog-post">
      <h1>{post.title}</h1>
      <small>{new Date(post.date).toLocaleDateString()}</small>
      <div className="content">{post.content}</div>
    </div>
  );
};

export default BlogPost; 