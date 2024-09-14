import React, { useState, useEffect, useRef } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

function PokemonCard({ pokemon, onClose }) {
  const { setPlayerPokemon } = useOutletContext();
  const audio = new Audio(pokemon.cries.latest);
  console.log(audio);
  // State to toggle between general info and base stats
  const [activeTab, setActiveTab] = useState("about"); // Use 'about' as the default active tab

  // Reference to the modal content to detect clicks outside
  const modalRef = useRef(null);

  // Effect to handle clicks outside of the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the modal content
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Call the close function when clicking outside
      }
    };

    // Add event listener to the document to capture clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const firstType = pokemon.types[0].type.name;
  const bgColorMap = {
    normal: "#BE768A",
    fighting: "#FE6E44",
    flying: "#94B2C7",
    poison: "#A971F0",
    ground: "#D08831 ",
    rock: "#A43E19",
    bug: "#45A043",
    ghost: "#906791",
    steel: "#1DB07F",
    fire: "#FF5C5C",
    water: "#6DCBFF",
    grass: "#06DA81",
    electric: "#FFDC62",
    psychic: "#F334C9",
    ice: "#ADE3FB",
    dragon: "#62CAD9",
    dark: "#595978",
    fairy: "#FA5295",
    stellar: "#33336B",
    unknown: "#707070",
  };

  const bgColorClass = bgColorMap[firstType];

  const navigate = useNavigate();
  const pokemonSelection = () => {
    audio.play();
    setPlayerPokemon(pokemon);
    navigate("/home/face-off");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div
        ref={modalRef} // Reference to the modal content
        className="relative rounded-xl shadow-lg w-5/12 max-w-sm"
        style={{ backgroundColor: bgColorClass }}
      >
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-8">
          <img
            src="./src/assets/images/pokeball.png"
            alt="Pokeball"
            className="w-16 h-16"
          />
        </div>
        <div className="p-6  float-start w-full">
          <h2 className="text-2xl text-white font-medium mb-2">
            {pokemon.name}
          </h2>
          <div>
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="mr-2 inline-block bg-gray-200 bg-opacity-50 text-black px-2 py-1 rounded text-sm capitalize"
              >
                {type.type.name}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-center ">
            <img
              src={
                pokemon.sprites.other.dream_world.front_default
                  ? pokemon.sprites.other.dream_world.front_default
                  : pokemon.sprites.front_default
              }
              alt={pokemon.name}
              className="-mb-10 relative z-10"
            />
          </div>
        </div>

        {/* Tab Content */}
        {/* Tabs Header */}
        <div className="float-start w-full p-6 relative bg-white rounded-2xl shadow-[0_-4px_8px_rgba(0,0,0,0.1)]">
          <div className="mb-4 float-start w-full">
            <button
              className={`px-4 py-2 font-semibold rounded-t ${
                activeTab === "about"
                  ? "text-black font-bold"
                  : "text-[#7B7B7B]"
              }`}
              onClick={() => setActiveTab("about")}
            >
              About
            </button>
            <button
              className={`px-4 py-2 font-semibold rounded-t ${
                activeTab === "baseStats"
                  ? "text-black font-bold"
                  : "text-[#7B7B7B]"
              }`}
              onClick={() => setActiveTab("baseStats")}
            >
              Base Stats
            </button>
          </div>
          {activeTab === "about" ? (
            <div className="mb-4 float-start w-full">
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr>
                    <td className="text-[#7B7B7B] font-medium text-sm pr-2">
                      <strong>Height:</strong>
                    </td>
                    <td className="text-[#7B7B7B] font-medium text-sm">
                      {pokemon.height}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[#7B7B7B] font-medium text-sm pr-2">
                      <strong>Weight:</strong>
                    </td>
                    <td className="text-[#7B7B7B] font-medium text-sm">
                      {pokemon.weight}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[#7B7B7B] font-medium text-sm pr-2">
                      <strong>Species:</strong>
                    </td>
                    <td className="text-[#7B7B7B] font-medium text-sm">
                      {pokemon.species.name}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[#7B7B7B] font-medium text-sm pr-2">
                      <strong>Types:</strong>
                    </td>
                    <td className="text-[#7B7B7B] font-medium text-sm">
                      {pokemon.types.map((type) => (
                        <span key={type.type.name} className="mr-1">
                          {type.type.name}
                        </span>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mb-4">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {pokemon.stats.map((stat) => (
                    <tr key={stat.stat.name} className="mb-2">
                      <td className="text-[#7B7B7B] font-medium text-sm pr-2 capitalize">
                        <strong>{stat.stat.name}:</strong>
                      </td>
                      <td
                        className="text-[#7B7B7B] font-medium text-sm w-full"
                        style={{ width: "60%" }}
                      >
                        <div className="relative mt-1 bg-gray-200 rounded-full h-1">
                          <div
                            className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                            style={{
                              width: `${(stat.base_stat / 200) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="float-start w-full text-center mt-6">
            <button
              className="px-6 py-2 bg-black text-white font-semibold rounded-full hover:bg-red-600"
              onClick={pokemonSelection}
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
