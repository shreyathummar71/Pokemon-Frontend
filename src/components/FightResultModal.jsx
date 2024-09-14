import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const FightResultModal = ({ winner, playerPokemon }) => {
  const { showHeader, username } = useOutletContext();
  const [error, setError] = useState(null);
  const [won, setWon] = useState(false);
  const [gameResult, setGameResult] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (winner === playerPokemon) {
      setGameResult("won");
      setWon(true);
    } else {
      setGameResult("lost");
      setWon(false);
    }
  }, [winner]);

  const resBody = {
    username,
    gameResult,
  };

  useEffect(() => {
    console.log(resBody);
  }, [resBody]);

  useEffect(() => {
    const sendResults = async () => {
      try {
        const response = await fetch("http://localhost:8081/leaderboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(resBody),
        });
        if (!response.ok) {
          throw new Error("Failed to post data");
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("An error occurred:", error.message);
        setError(error.message);
      }
    };
    if (gameResult) {
      sendResults();
    }
  }, [gameResult, username]);

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
          {won ? <h1>Congratulations! You won!</h1> : <h1>Sorry, you lost.</h1>}
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
        </div>
      </div>
    </div>
  );
};

export default FightResultModal;
