import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import Sidebar from "./Sidebar";

const MainLayout = () => {
  const [username, setUsername] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [detailedPokemons, setDetailedPokemons] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [playerPokemon, setPlayerPokemon] = useState({});
  const [opponentPokemon, setOpponentPokemon] = useState(null);

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // This function will be used to toggle the header's visibility
  const hideHeader = () => setIsHeaderVisible(false);
  const showHeader = () => setIsHeaderVisible(true);

  const toggleDrawer = () => setIsOpen(!isOpen);
  const closeDrawer = () => setIsOpen(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("username"));
    setUsername(user);
  }, []);

  useEffect(() => {
    const getPokemons = async () => {
      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
      );
      const data = await res.json();
      setPokemons(data.results);
    };

    getPokemons();
  }, []);

  useEffect(() => {
    if (pokemons.length) {
      const getDetailedPokemonData = async () => {
        const detailedPromise = pokemons.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        );
        const details = await Promise.all(detailedPromise);
        setDetailedPokemons(details);
        //console.log(details);
      };
      getDetailedPokemonData();
    }
  }, [pokemons]);

  //console.log("Player picked:", playerPokemon);

  useEffect(() => {
    const storedPlayerPokemon = localStorage.getItem("playerPokemon");
    if (storedPlayerPokemon) {
      setPlayerPokemon(JSON.parse(storedPlayerPokemon));
    }
  }, []);

  useEffect(() => {
    if (playerPokemon && Object.keys(playerPokemon).length > 0) {
      localStorage.setItem("playerPokemon", JSON.stringify(playerPokemon));
    }
  }, [playerPokemon]);

  return (
    <div className="min-h-screen">
      {isHeaderVisible && <Header username={username} />}
      <Outlet
        context={{
          username,
          setUsername,
          detailedPokemons,
          setDetailedPokemons,
          selectedType,
          setSelectedType,
          playerPokemon,
          setPlayerPokemon,
          hideHeader,
          showHeader,
          opponentPokemon,
          setOpponentPokemon,
          isOpen,
          toggleDrawer,
        }}
      />
      <Sidebar
        isOpen={isOpen}
        closeDrawer={closeDrawer}
        onTypeSelect={setSelectedType}
      />
    </div>
  );
};

export default MainLayout;
