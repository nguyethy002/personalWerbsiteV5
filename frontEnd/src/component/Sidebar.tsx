import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Icon from "./Icon"; // Adjust the path to where your Icon component is located
import "../styles/Sidebar.sass";

// Define the navigation items with FontAwesome icons as tuples
const NAV_ITEMS = [
  { to: "/", label: "Home", icon: ["fas", "home"] },
  { to: "/dashboard", label: "About", icon: ["fas", "info-circle"] },
  { to: "/project", label: "Project", icon: ["fas", "folder"] },
  { to: "/blog", label: "Blog", icon: ["fas", "pen"] },
];

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="header">
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <nav>
          <ul>
            {NAV_ITEMS.map((item, index) => (
              <React.Fragment key={item.to}>
                <li>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => (isActive ? "selected" : "")}
                  >
                    <Icon
                      icon={item.icon}  // Pass icon tuple
                      className="nav-icon"
                      style={{ marginRight: isSidebarOpen ? "10px" : "0" }}
                    />
                    {isSidebarOpen && <span className="label">{item.label}</span>}
                  </NavLink>
                </li>
                {index < NAV_ITEMS.length - 1 && <div className="line">❀</div>}
              </React.Fragment>
            ))}
          </ul>
        </nav>
        <div className="sidebar-buttons">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {isSidebarOpen ? "Close" : "Open"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
