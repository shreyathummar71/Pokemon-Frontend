// src/pages/Homepage.js
import React, { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import bg from "../assets/images/home-bg.jpg";
import pokeball from "../assets/images/pokeball.png";

function Homepage() {
  // State to store the user's name
  //const { username, setUsername } = useOutletContext();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  // State to control whether the popup is shown
  const [showPopup, setShowPopup] = useState(true);

  // Function to handle form submission
  const handleNameSubmit = (e) => {
    e.preventDefault();

    if (username.trim() !== "") {
      localStorage.setItem("username", JSON.stringify(username));
      setShowPopup(false); // Hide the popup after submitting the name#
      navigate("/home");
    } else {
      alert("Please enter your name."); // Basic validation
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Full background image */}

      <div
        className={`fixed inset-0 bg-cover bg-center ${
          !showPopup ? "hidden" : "block"
        } transition-opacity duration-300`}
        style={{ backgroundImage: `url(${bg})` }}
      ></div>

      {/* <img src="./assets/images/home-bg"></img> */}
      {/* Popup for entering the username */}
      {showPopup && (
        <div className="flex items-center justify-center fixed inset-0 bg-opacity-75">
          <form
            onSubmit={handleNameSubmit}
            className="bg-white p-8 relative rounded shadow-lg text-center"
          >
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-10">
              <img src={pokeball} alt="Pokeball" className="w-16 h-16" />
            </div>
            <h2 className="text-2xl text-black text-center font-semibold">
              Welcome to your epic{" "}
              <span className="float-start w-full mb-4">
                Pokemon Battlefield!
              </span>
            </h2>
            <div className="m-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your Name"
                className="w-full text-black px-4 py-2 border border-gray-300 bg-[#fff] rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default Homepage;
