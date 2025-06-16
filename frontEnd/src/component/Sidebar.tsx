import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Icon from "./Icon"; // Adjust the path to where your Icon component is located
import "../styles/Sidebar.sass";
import { Logo } from "../assets";

// Define the navigation items with correct FontAwesome icon styles
const NAV_ITEMS: { to: string; label: string; icon: [string, string] }[] = [
  { to: "/", label: "Home", icon: ["fas", "home"] }, // Solid Home Icon
  { to: "/dashboard", label: "About", icon: ["fas", "info-circle"] }, // Solid Info Circle Icon
  { to: "/project", label: "Project", icon: ["fas", "folder"] }, // Solid Folder Icon
  { to: "/blog", label: "Blog", icon: ["fas", "pen"] }, // Solid Pen Icon
];

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  return (
    <>
      {/* Sidebar for large screens */}
      <div className="sidebar-container hidden lg:flex">
        <div className="header">
          <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <img src={Logo} alt="Logo" className="sidebar-logo" />
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
                    {index < NAV_ITEMS.length - 1 && <div className="line"></div>}
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
      </div>

      {/* Bottom nav for small screens */}
      <nav className="bottom-nav flex lg:hidden">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `bottom-nav-link${isActive ? " selected" : ""}`
            }
          >
            <Icon icon={item.icon} className="bottom-nav-icon" />
            <span className="bottom-nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default Header;
