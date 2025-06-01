import express, { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import cors from "cors";

// Initialize Express application
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/blog")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Error connecting to MongoDB:", err));

// Define Blog Schema and Model (Mongoose auto-generates _id as ObjectId)
const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", BlogSchema);

// =======================
// 🚀 API Routes
// =======================

// Get all posts
app.get("/api/posts", async (req: Request, res: Response): Promise<Response> => {
  try {
    const posts = await Blog.find();
    return res.json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error fetching posts");
  }
});

// Create a new post (ObjectId is auto-generated)
app.post("/api/posts", async (req: Request, res: Response): Promise<Response> => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send("Title and content are required");
  }

  try {
    const newPost = new Blog({ title, content }); // No _id passed
    await newPost.save();
    return res.status(201).json(newPost); // Respond with full post including ObjectId
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error creating post");
  }
});

// Delete a post by ID
app.delete("/api/posts/:id", async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid post ID format");
  }

  try {
    const deletedPost = await Blog.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).send("Post not found");
    }
    return res.status(200).send("Post deleted");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error deleting post");
  }
});

// Get a single post by ID (with ObjectId validation)
app.get("/api/posts/:id", async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid post ID format");
  }

  try {
    const post = await Blog.findById(id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    return res.json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error fetching post");
  }
});

// =======================
// 🛑 Global Error Handler
// =======================
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error("Unexpected error:", err.stack);
  res.status(500).send("Something broke!");
});
