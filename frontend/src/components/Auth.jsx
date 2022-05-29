import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../actions/auth";

const initialState = { name: "", email: "", password: "" };

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  return (
    <section className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded p-6 space-y-4">
        <div className="mb-4">
          <p className="text-gray-600"> {isSignup ? "Sign Up" : "Sign In"} </p>
          <h2 className="text-xl font-bold">
            {isSignup ? "Join our community" : "Enter your dashboard"}
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            {isSignup ? (
              <>
                <div>
                  <input
                    className="w-full mb-5 p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                  />
                  <input
                    className="mb-5 w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                    type="text"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <input
                    className="mb-5 w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                    type="text"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200"
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between">
          <div className="flex flex-row items-center">
            <input
              type="checkbox"
              class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label
              for="comments"
              class="ml-2 text-sm font-normal text-gray-600"
            >
              Remember me
            </label>
          </div>
          <div>
            <button
              onClick={switchMode}
              className="text-sm text-blue-600 hover:underline"
              href="#"
            >
              {isSignup
                ? "Already have an account? Sign In"
                : "Don´t have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
