import { useOutletContext, useNavigate } from "react-router-dom";
import faceoff from "../assets/images/face_off_bg.png";
import rectangle from "../assets/images/rectangle.png";

import { useState, useEffect } from "react";

const Opponents = () => {
  const {
    playerPokemon,
    detailedPokemons,
    hideHeader,
    opponentPokemon,
    setOpponentPokemon,
  } = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    hideHeader();
  }, [hideHeader]);

  useEffect(() => {
    if (detailedPokemons && detailedPokemons.length > 0) {
      const opponent =
        detailedPokemons[Math.floor(Math.random() * detailedPokemons.length)];
      console.log("Opponent picked:", opponent);
      setOpponentPokemon(opponent);
    }
  }, [detailedPokemons]);

  useEffect(() => {
    if (opponentPokemon) {
      localStorage.setItem("opponentPokemon", JSON.stringify(opponentPokemon));
    }
  }, [opponentPokemon]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home/fight");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (!opponentPokemon) {
    return <div>Loading...</div>; // Add a loading state if opponent is not yet picked
  }

  const filteredStatsPlayer = playerPokemon.stats.filter((statObj) =>
    ["hp", "speed", "attack", "defense"].includes(statObj.stat.name)
  );

  const filteredStatsOpponent = opponentPokemon.stats.filter((statObj) =>
    ["hp", "speed", "attack", "defense"].includes(statObj.stat.name)
  );

  return (
    <div className="w-full relative">
      <div
        className="bg-cover bg-center h-screen"
        style={{ backgroundImage: `url(${faceoff})` }}
      ></div>
      <h1 className="text-[270px] text-indigo-900 font-black italic absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        VS
      </h1>
      <div className="w-64 h-64 bg-red-200 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
      <div className="w-80 h-80 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div>
        <img
          src={rectangle}
          className="absolute top-1/2 left-1/2 h-full transform -translate-x-1/2 -translate-y-1/2"
          alt="Rectangle"
        />
      </div>
      <div>
        <div className="flex flex-col items-center z-50 fixed top-1/2 transform -translate-y-1/2 left-32">
          <img
            src={playerPokemon.sprites.other.dream_world.front_default}
            alt={playerPokemon.name}
            className=" h-[450px] "
          />
          <div className=" mt-10">
            <h2 className="capitalize m-2 text-6xl px-8 pb-2 pt-1 bg-white/75 text-gray-700 rounded-full ">
              {playerPokemon.name}
            </h2>
            <div className="py-2  bg-white/75 rounded-2xl">
              {filteredStatsPlayer.map((statObj, index) => (
                <div key={index}>
                  <p className="text-2xl ml-4">
                    {statObj.stat.name.toUpperCase()}: {statObj.base_stat}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center z-50 fixed top-1/2 transform -translate-y-1/2 right-32">
          <img
            src={opponentPokemon.sprites.other.dream_world.front_default}
            alt={opponentPokemon.name}
            className=" h-[450px] "
          />
          <div className=" mt-10">
            <h2 className="capitalize m-2 text-6xl px-8 pb-2 pt-1 bg-white/75 text-gray-700 rounded-full ">
              {opponentPokemon.name}
            </h2>
            <div className="py-2  bg-white/75 rounded-2xl">
              {filteredStatsOpponent.map((statObj, index) => (
                <div key={index}>
                  <p className="text-2xl ml-4">
                    {statObj.stat.name.toUpperCase()}: {statObj.base_stat}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Opponents;
