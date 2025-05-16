import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

// Initialize Express application
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Built-in middleware for JSON parsing

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/blog")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

// Define Blog Schema and Model
const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", BlogSchema);

// API Routes
app.get(
  "/api/posts",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const posts = await Blog.find();
      return res.json(posts); // Ensure to return the response
    } catch (err) {
      console.error(err);
      return res.status(500).send("Error fetching posts"); // Ensure to return the response
    }
  }
);

app.post(
  "/api/posts",
  async (req: Request, res: Response): Promise<Response> => {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).send("Title and content are required");
    }

    try {
      const newPost = new Blog({ title, content });
      await newPost.save();
      return res.status(201).send("Post created"); // Ensure to return the response
    } catch (err) {
      console.log(err);
      return res.status(500).send("Error creating post"); // Ensure to return the response
    }
  }
);

app.delete(
  "/api/posts/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const postId = req.params.id;

    try {
      const deletedPost = await Blog.findByIdAndDelete(postId);
      if (!deletedPost) {
        return res.status(404).send("Post not found"); // Ensure to return the response
      }
      return res.status(200).send("Post deleted"); // Ensure to return the response
    } catch (err) {
      console.log(err);
      return res.status(500).send("Error deleting post"); // Ensure to return the response
    }
  }
);

app.get("/api/posts/:id", async (req: Request, res: Response): Promise<Response> => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    return res.json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error fetching post");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

