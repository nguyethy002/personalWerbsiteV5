import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

// ✅ Explicit allowed origins
const allowedOrigins = ["http://localhost:5173", "https://thy-website.web.app"];

// ✅ Define full CORS options
const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  methods: ["GET", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// ✅ Apply CORS before any middleware or routes
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// ✅ Body parsing middleware
app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect("mongodb+srv://minhthy0120032003:498yNSz6nnFHdWmp@cluster0.ohtbnqy.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Blog Schema & Model
const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});
const Blog = mongoose.model("Blog", BlogSchema);

// ✅ Routes
app.get("/posts", async (_req, res) => {
  try {
    const posts = await Blog.find();
    return res.json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error fetching posts");
  }
});

app.get("/posts/:id", async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) return res.status(404).send("Post not found");
    return res.json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error fetching post");
  }
});

app.post("/posts", async (req, res) => {
  console.log("🔥 POST /posts", req.body);
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).send("Title and content are required");

  try {
    const newPost = new Blog({ title, content });
    await newPost.save();
    return res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error creating post");
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const deletedPost = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).send("Post not found");
    return res.status(200).send("Post deleted");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error deleting post");
  }
});

// ✅ Firebase Function Export
export const api = functions.https.onRequest(app);
