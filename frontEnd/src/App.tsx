import { Header } from "./component";
import { Dashboard, Home, Project, BlogList, CreatePost, BlogPost } from "./component";
import { initializeIconList } from "./utils/iconInitializer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/main/theme.sass";
import "./styles/main/App.sass";

initializeIconList();

function App() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return (
    <Router>
      <div className="app-container">
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/project" element={<Project />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            {isDevelopment && <Route path="/admin/create" element={<CreatePost />} />}
          </Routes>
        </div>
        <Header />
      </div>
    </Router>
  );
}

export default App;
