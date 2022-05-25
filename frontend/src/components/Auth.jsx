import React, { useState } from "react";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = () => {};

  const handleChange = () => {};

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
        <div>
          {isSignup ? (
            <>
              <div>
                <input
                  className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                  type="text"
                  name="name"
                  placeholder="Name"
                  handleChange={handleChange}
                />
                <input
                  className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                  type="text"
                  name="email"
                  placeholder="Email"
                  handleChange={handleChange}
                />
              </div>
              <div>
                <input
                  className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                  type="text"
                  name="password"
                  placeholder="Password"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <input
                  className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                  type="text"
                  name="email"
                  placeholder="Email"
                  handleChange={handleChange}
                />
              </div>
              <div>
                <input
                  className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                  type="text"
                  name="password"
                  placeholder="Password"
                />
              </div>
            </>
          )}
        </div>
        <div>
          <button
            onSubmit={handleSubmit}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200"
          >
            Sign In
          </button>
        </div>
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
