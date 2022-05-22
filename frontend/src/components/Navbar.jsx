import React from "react";

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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
        </div>
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>

      <div className="navbar-end">
        <a className="btn"> {user ? "Hola luis" : <button>Login</button>} </a>
      </div>
    </div>
  );
};

export default Navbar;
