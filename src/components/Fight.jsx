import { useOutletContext, useNavigate } from "react-router-dom";
import battle_grounds from "../assets/images/battle_grounds.webp";
import { useState, useEffect } from "react";

const Fight = () => {
  const { playerPokemon, hideHeader, username } = useOutletContext(); // No need for detailedPokemons anymore
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [counter, setCounter] = useState(3);

  const navigate = useNavigate();

  // All hooks must be called before any early returns
  useEffect(() => {
    hideHeader();
  }, [hideHeader]);

  // Retrieve opponentPokemon from localStorage when component mounts
  useEffect(() => {
    const storedOpponent = localStorage.getItem("opponentPokemon");
    if (storedOpponent) {
      setOpponentPokemon(JSON.parse(storedOpponent));
    } else {
      console.error("Opponent Pokemon not found in local storage!");
    }
  }, []);

  // Countdown logic with effect
  useEffect(() => {
    if (counter > 0) {
      const interval = setInterval(() => {
        setCounter((prevCounter) => (prevCounter > 1 ? prevCounter - 1 : 0));
      }, 1000);

      // Cleanup interval when component unmounts or when counter is 0
      return () => clearInterval(interval);
    }
  }, [counter]);

  if (!opponentPokemon || !playerPokemon || !playerPokemon.stats) {
    return <div>Loading...</div>; // Ensure both player and opponent pokemon are loaded to get stats
  }

  //GAME LOGIC
  const playerStats = {
    hp: playerPokemon.stats[0].base_stat,
    att: playerPokemon.stats[1].base_stat,
    def: playerPokemon.stats[2].base_stat,
    spAtt: playerPokemon.stats[3].base_stat,
    spDef: playerPokemon.stats[4].base_stat,
    speed: playerPokemon.stats[5].base_stat,
  };

  const opponentStats = {
    hp: opponentPokemon.stats[0].base_stat,
    att: opponentPokemon.stats[1].base_stat,
    def: opponentPokemon.stats[2].base_stat,
    spAtt: opponentPokemon.stats[3].base_stat,
    spDef: opponentPokemon.stats[4].base_stat,
    speed: opponentPokemon.stats[5].base_stat,
  };

  return (
    <div className="w-full relative">
      <div
        className="bg-cover bg-center h-screen"
        style={{ backgroundImage: `url(${battle_grounds})` }}
      ></div>
      <span
        className="countdown font-bold italic text-[400px] text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        style={{ opacity: counter === 0 ? 0 : 1 }}
      >
        <span style={{ "--value": counter }}></span>
      </span>

      <div>
        <div className="flex flex-col items-start z-40 fixed -bottom-24 transform -translate-y-1/2 left-96">
          <img
            src={playerPokemon.sprites.other.showdown.back_default}
            alt={playerPokemon.name}
            className=" h-64 "
          />
          <div className="mt-4 w-full flex flex-col items-start">
            <div className="flex gap-2 items-center w-full justify-end">
              <progress
                className="progress progress-error w-56 bg-white"
                value={playerStats.hp}
                max="100"
              ></progress>
              <span className="font-medium text-white">HP</span>
            </div>
            <h2 className="text-xl text-white font-medium capitalize">
              {playerPokemon.name}
            </h2>
            <h2 className="text-3xl text-white font-bold capitalize">
              {username}
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-start z-40 fixed top-96 transform -translate-y-1/2 right-[500px]">
          <img
            src={opponentPokemon.sprites.other.showdown.front_default}
            alt={opponentPokemon.name}
            className="h-64"
          />
          <div className="mt-4 w-full flex flex-col items-end">
            {" "}
            {/* Ensure the container spans the full width */}
            <div className="flex gap-2 items-center w-full justify-end">
              <span className="font-medium text-white">HP</span>
              <progress
                className="progress progress-error w-56 bg-white"
                value={opponentStats.hp}
                max="100"
              ></progress>
            </div>
            <h2 className="text-xl text-white font-medium capitalize">
              {opponentPokemon.name}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fight;
