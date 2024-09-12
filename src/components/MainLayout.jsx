import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "./Footer";

const MainLayout = () => {
  const [username, setUsername] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [detailedPokemons, setDetailedPokemons] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("username"));
    setUsername(user);
  }, []);

  useEffect(() => {
    const getPokemons = async () => {
      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?offset=50&limit=50"
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

  //console.log(detailedPokemons);

  return (
    <>
      <Header username={username} />
      <Outlet
        context={{
          username,
          setUsername,
          detailedPokemons,
          setDetailedPokemons,
        }}
      />
      <Footer />
    </>
  );
};

export default MainLayout;
