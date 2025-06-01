"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const mongoose_1 = __importStar(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
// Initialize Express application
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express_1.default.json());
// Connect to MongoDB
mongoose_1.default
    .connect("mongodb://localhost:27017/blog")
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ Error connecting to MongoDB:", err));
// Define Blog Schema and Model (Mongoose auto-generates _id as ObjectId)
const BlogSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
});
const Blog = mongoose_1.default.model("Blog", BlogSchema);
// =======================
// 🚀 API Routes
// =======================
// Get all posts
app.get("/api/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Blog.find();
        return res.json(posts);
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Error fetching posts");
    }
}));
// Create a new post (ObjectId is auto-generated)
app.post("/api/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).send("Title and content are required");
    }
    try {
        const newPost = new Blog({ title, content }); // No _id passed
        yield newPost.save();
        return res.status(201).json(newPost); // Respond with full post including ObjectId
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Error creating post");
    }
}));
// Delete a post by ID
app.delete("/api/posts/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Invalid post ID format");
    }
    try {
        const deletedPost = yield Blog.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).send("Post not found");
        }
        return res.status(200).send("Post deleted");
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Error deleting post");
    }
}));
// Get a single post by ID (with ObjectId validation)
app.get("/api/posts/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Invalid post ID format");
    }
    try {
        const post = yield Blog.findById(id);
        if (!post) {
            return res.status(404).send("Post not found");
        }
        return res.json(post);
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Error fetching post");
    }
}));
// =======================
// 🛑 Global Error Handler
// =======================
app.use((err, req, res, next) => {
    console.error("Unexpected error:", err.stack);
    res.status(500).send("Something broke!");
});
// Start the server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
