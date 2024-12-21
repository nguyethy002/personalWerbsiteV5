"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
// Initialize Express application
const app = (0, express_1.default)();
const port = 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // Built-in middleware for JSON parsing
// Connect to MongoDB
mongoose_1.default
    .connect("mongodb://localhost:27017/blog")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error connecting to MongoDB", err));
// Define Blog Schema and Model
const BlogSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
});
const Blog = mongoose_1.default.model("Blog", BlogSchema);
// API Routes
app.get("/api/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Blog.find();
        return res.json(posts); // Ensure to return the response
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Error fetching posts"); // Ensure to return the response
    }
}));
app.post("/api/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).send("Title and content are required");
    }
    try {
        const newPost = new Blog({ title, content });
        yield newPost.save();
        return res.status(201).send("Post created"); // Ensure to return the response
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Error creating post"); // Ensure to return the response
    }
}));
app.delete("/api/posts/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    try {
        const deletedPost = yield Blog.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).send("Post not found"); // Ensure to return the response
        }
        return res.status(200).send("Post deleted"); // Ensure to return the response
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Error deleting post"); // Ensure to return the response
    }
}));
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
