import React, { useState } from "react";

function PokemonCard({ pokemon, onClose }) {
  // State to toggle between general info and base stats
  const [activeTab, setActiveTab] = useState("about"); // Use 'about' as the default active tab

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-[#FFDC62] relative rounded-xl shadow-lg w-5/12 max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-10">
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
                className="mr-2 inline-block bg-gray-200 bg-opacity-50 text-black px-2 py-1 rounded text-sm"
              >
                {type.type.name}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-center">
            <img
              src={pokemon.sprites.other.dream_world.front_default}
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
            <button className="px-6 py-2 bg-black text-white font-semibold rounded-full hover:bg-red-600">
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
