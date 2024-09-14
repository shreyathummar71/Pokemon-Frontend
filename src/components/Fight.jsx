import { useOutletContext } from "react-router-dom";
import battle_grounds from "../assets/images/battle_grounds.webp";
import { useState, useEffect } from "react";
import FightResultModal from "./FightResultModal";

const Fight = () => {
  const { playerPokemon, hideHeader, username } = useOutletContext();
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [counter, setCounter] = useState(3);

  // States to manage health of player and opponent
  const [playerHealth, setPlayerHealth] = useState(0);
  const [opponentHealth, setOpponentHealth] = useState(0);
  const [fightStarted, setFightStarted] = useState(false);
  const [fightEnded, setFightEnded] = useState(false);
  const [battleInterval, setBattleInterval] = useState(null);
  const [winner, setWinner] = useState({});

  //Modal
  const [openModal, setOpenModal] = useState(false);
  const toggleOn = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    hideHeader();
  }, [hideHeader]);

  useEffect(() => {
    const storedOpponent = localStorage.getItem("opponentPokemon");
    if (storedOpponent) {
      setOpponentPokemon(JSON.parse(storedOpponent));
    } else {
      console.error("Opponent Pokemon not found in local storage!");
    }
  }, []);

  useEffect(() => {
    if (counter > 0) {
      const interval = setInterval(() => {
        setCounter((prevCounter) => (prevCounter > 1 ? prevCounter - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    } else if (counter === 0 && !fightStarted) {
      setFightStarted(true);
    }
  }, [counter]);

  useEffect(() => {
    if (!opponentPokemon || !playerPokemon) return;

    // Initialize health states
    setPlayerHealth(playerPokemon.stats[0].base_stat);
    setOpponentHealth(opponentPokemon.stats[0].base_stat);
  }, [opponentPokemon, playerPokemon]);

  //FIGHT SCENE
  useEffect(() => {
    if (fightStarted) {
      // Calculate initial damage
      const playerAttack = playerPokemon.stats[1].base_stat;
      const opponentDefense = opponentPokemon.stats[2].base_stat;

      const opponentAttack = opponentPokemon.stats[1].base_stat;
      const playerDefense = playerPokemon.stats[2].base_stat;

      const damageToOpponent = Math.max(playerAttack - opponentDefense, 10);
      const damageToPlayer = Math.max(opponentAttack - playerDefense, 10);

      console.log("Player Attack:", playerAttack);
      console.log("Opponent Defense:", opponentDefense);
      console.log("Opponent Attack:", opponentAttack);
      console.log("Player Defense:", playerDefense);
      console.log("Damage to Opponent:", damageToOpponent);
      console.log("Damage to Player:", damageToPlayer);
      // Clear previous interval if it exists
      if (battleInterval) {
        clearInterval(battleInterval);
      }

      // Create new interval for battle simulation
      const interval = setInterval(() => {
        setOpponentHealth((prev) => {
          //Calculates the new health by subtracting the damage dealt to the opponent from the previous health. Ensures that the new health value doesn’t go below 0
          const newHealth = Math.max(prev - damageToOpponent, 0);
          //if health is zero or lower the battle gets stopped and the interval gets cleared
          if (newHealth <= 0) {
            clearInterval(interval);
            console.log("Updated Opponent Health:", newHealth); // Debugging line
            setFightEnded(true);
            setWinner(playerPokemon);
          }
          return newHealth;
        });

        setPlayerHealth((prev) => {
          const newHealth = Math.max(prev - damageToPlayer, 0);
          if (newHealth <= 0) {
            clearInterval(interval);
            console.log("Updated Player Health:", newHealth); // Debugging line
            setFightEnded(true);
            setWinner(opponentPokemon);
          }
          return newHealth;
        });
      }, 1000); // Update health every second

      setBattleInterval(interval);

      return () => {
        clearInterval(interval);
      };
    }
  }, [fightStarted, playerPokemon, opponentPokemon]);

  useEffect(() => {
    if (fightEnded) {
      const timer = setTimeout(() => {
        toggleOn(); // Open the modal afte 2 seconds
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [fightEnded]);

  if (!opponentPokemon || !playerPokemon) {
    return <div>Loading...</div>;
  }

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
        <div className="flex flex-col items-start z-20 fixed -bottom-24 transform -translate-y-1/2 left-96">
          <img
            src={playerPokemon.sprites.other.showdown.back_default}
            alt={playerPokemon.name}
            className=" h-64 "
          />
          <div className="mt-4 w-full flex flex-col items-start">
            <div className="flex gap-2 items-center w-full justify-end">
              <progress
                className="progress progress-error w-56 bg-white"
                value={playerHealth}
                max={playerPokemon.stats[0].base_stat}
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

        <div className="flex flex-col items-end z-20 fixed top-96 transform -translate-y-1/2 right-[500px]">
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
                value={opponentHealth}
                max={opponentPokemon.stats[0].base_stat}
              ></progress>
            </div>
            <h2 className="text-xl text-white font-medium capitalize">
              {opponentPokemon.name}
            </h2>
          </div>
        </div>
      </div>
      {openModal && (
        <FightResultModal winner={winner} playerPokemon={playerPokemon} />
      )}
    </div>
  );
};

export default Fight;
