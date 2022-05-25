import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = null;

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabindex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          daisyUI
        </Link>
      </div>

      <div className="navbar-end">
        <a className="btn">
          {user ? (
            "Hola luis"
          ) : (
            <Link to="/auth">
              <button>Login</button>
            </Link>
          )}
        </a>
      </div>
    </div>
  );
};

export default Navbar;
