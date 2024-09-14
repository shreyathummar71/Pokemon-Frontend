import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const FightResultModal = ({ winner, playerPokemon }) => {
  const { showHeader } = useOutletContext();
  const [won, setWon] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (winner === playerPokemon) {
      setWon(true);
    } else {
      setWon(false);
    }
  }, [winner]);

  useEffect(() => {
    console.log("Player Pokemon:", playerPokemon.name);
    console.log("Winner:", winner.name);
    console.log("Did the player win?", won);
  }, [won, playerPokemon, winner]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home/leaderboard");
      showHeader();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white p-6 rounded-3xl w-96">
        <div className="flex flex-col items-center">
          <h2 className="font-medium text-gray-600 text-2xl mb-2">
            The winner is...
          </h2>
          <img
            className="h-96"
            src={
              winner.sprites.other.dream_world.front_default
                ? winner.sprites.other.dream_world.front_default
                : winner.sprites.front_default
            }
          />
          <h1 className="capitalize font-bold text-black text-4xl">
            {winner.name}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default FightResultModal;
