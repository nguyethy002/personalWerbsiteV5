// import { ReactComponent as Logo } from "../assets/Logo.svg";
import { NavLink } from "react-router-dom";
import "../styles/Header.sass";
import React from "react";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "About" },
  { to: "/project", label: "Project" },
  { to: "/blog", label: "Blog" },
];

const Header = () => {
  return (
    <div className="header">
      {/* <div className="logo">
        <Logo />
      </div> */}
      <nav>
        <ul>
          {NAV_ITEMS.map((item, index) => (
            <React.Fragment key={item.to}>
              <li>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => (isActive ? "selected" : "")}
                >
                  {item.label}
                </NavLink>
              </li>
              {index < NAV_ITEMS.length - 1 && <div className="line">❀</div>}
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
