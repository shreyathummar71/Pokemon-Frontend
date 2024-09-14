import PokemonListItem from "./PokemonListItem";
import { useOutletContext } from "react-router-dom";
import bg_Poke from "../assets/images/bg_pokeball.png";
import { useState } from "react";
import menuItem from "../assets/images/menu_icon.png";

const AllPokemon = () => {
  const { detailedPokemons, selectedType, isOpen, toggleDrawer } =
    useOutletContext();

  //SEARCH FUNCTION
  const [searchedPokemon, setSearchedPokemon] = useState("");
  const searchedPokemons = detailedPokemons.filter((pokemon) =>
    searchedPokemon
      ? pokemon.name.toLowerCase().includes(searchedPokemon.toLowerCase())
      : true
  );
  console.log(searchedPokemons);

  // State to manage how many Pokémon to display
  const [displayCount, setDisplayCount] = useState(30);

  // Filter the Pokémon based on the selected type if there is one
  const filteredPokemons = detailedPokemons.filter((pokemon) =>
    selectedType
      ? pokemon.types.some((type) => type.type.name === selectedType)
      : true
  );

  // Slice the Pokémon list based on the display count
  const pokemonsToDisplay = filteredPokemons.slice(0, displayCount);

  // Function to load more Pokémon
  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 30);
  };

  return (
    <div className="py-10 relative">
      <button
        type="button"
        onClick={toggleDrawer}
        aria-controls="drawer-navigation"
        aria-expanded={isOpen}
        className="fixed left-10 top-50"
      >
        <img src={menuItem} alt="Pokeball" className="w-24 h-auto" />
      </button>
      <div className="form-control">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-52 rounded-full bg-red-100 absolute right-10 top-50"
          value={searchedPokemon}
          onChange={(e) => {
            setSearchedPokemon(e.target.value);
          }}
        />
      </div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 my-10 mx-32 place-items-center z-10">
        {searchedPokemon
          ? searchedPokemons.map((pokemon) => (
              <PokemonListItem key={pokemon.id} pokemon={pokemon} />
            ))
          : pokemonsToDisplay.map((pokemon) => (
              <PokemonListItem key={pokemon.id} pokemon={pokemon} />
            ))}
      </div>
      {/* Load More Button */}
      {displayCount < filteredPokemons.length && (
        <div className="flex justify-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-red-600 transition"
          >
            Load More
          </button>
        </div>
      )}
      <button className="">Top</button>
    </div>
  );
};

export default AllPokemon;
