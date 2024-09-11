// src/pages/Homepage.js
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

function Homepage() {
  // State to store the user's name
  const { username, setUsername } = useOutletContext();
  // State to control whether the popup is shown
  const [showPopup, setShowPopup] = useState(true);

  // Function to handle form submission
  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      setShowPopup(false); // Hide the popup after submitting the name
    } else {
      alert("Please enter your name."); // Basic validation
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Full background image */}

      <div
        className={`fixed inset-0 bg-cover bg-center ${
          !showPopup ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
        style={{ backgroundImage: `url('./src/assets/images/home-bg.jpg')` }}
      ></div>

      {/* <img src="./assets/images/home-bg"></img> */}
      {/* Popup for entering the username */}
      {showPopup && (
        <div className="flex items-center justify-center fixed inset-0 bg-opacity-75 z-10">
          <form
            onSubmit={handleNameSubmit}
            className="bg-white p-8 rounded shadow-lg text-center"
          >
            <h2 className="text-2xl w-3/4 text-center font-semibold mb-4">
              Welcome to your epic Pokemon Battlefield!
            </h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {/* Main content of the website, displayed after name submission */}
      {!showPopup && (
        <div className="relative z-5 text-center text-white p-8">
          <h1 className="text-4xl font-bold">Welcome, {username}!</h1>
          <p className="mt-4">This is your Pokémon adventure!</p>
          {/* Add other components or website content here */}
        </div>
      )}
    </div>
  );
}

export default Homepage;
