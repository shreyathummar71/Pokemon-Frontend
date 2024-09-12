import PokemonListItem from "./PokemonListItem";
import { useOutletContext } from "react-router-dom";
import bg_Poke from "../assets/images/bg_pokeball.png";
import Sidebar from "./Sidebar";
import { useState } from "react";

const AllPokemon = () => {
  const { detailedPokemons, selectedType } = useOutletContext();

  const filteredPokemons = detailedPokemons.filter((pokemon) =>
    selectedType
      ? pokemon.types.some((type) => type.type.name === selectedType)
      : true
  );

  return (
    <div className="py-10">
      <img
        src={bg_Poke}
        alt="pokeball_grey"
        className="fixed inset-fixed -bottom-36 -right-36 overflow-hidden"
      />
      <div className="text-center my-5">
        <h1 className="text-2xl font-bold">
          {selectedType ? `Showing ${selectedType} Pokémon` : "All Pokémon"}
        </h1>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 my-10 mx-32 place-items-center z-10">
        {selectedType
          ? filteredPokemons.map((pokemon) => (
              <PokemonListItem key={pokemon.id} pokemon={pokemon} />
            ))
          : detailedPokemons.map((pokemon) => (
              <PokemonListItem key={pokemon.id} pokemon={pokemon} />
            ))}
      </div>
    </div>
  );
};

export default AllPokemon;
