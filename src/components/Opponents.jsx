import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import faceoff from "../assets/images/face_off_bg.png";

const Opponents = () => {
  const { playerPokemon, detailedPokemons, hideHeader, showHeader } =
    useOutletContext();

  useEffect(() => {
    hideHeader();
  }, [hideHeader]);

  const opponent =
    detailedPokemons[Math.floor(Math.random() * detailedPokemons.length)];
  console.log("Opponent picked:", opponent);

  return (
    <div className="w-full ">
      <div
        className="bg-cover bg-center h-screen"
        style={{ backgroundImage: `url(${faceoff})` }}
      ></div>
    </div>
  );
};

export default Opponents;
