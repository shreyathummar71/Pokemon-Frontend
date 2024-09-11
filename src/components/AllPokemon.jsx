import PokemonListItem from "./PokemonListItem";
import { useOutletContext } from "react-router-dom";
import bg_Poke from "../assets/images/bg_pokeball.png";

const AllPokemon = () => {
  const { detailedPokemons } = useOutletContext();
  return (
    <div className="py-10">
      <img
        src={bg_Poke}
        alt="pokeball_grey"
        className="fixed inset-fixed -bottom-36 -right-36 overflow-hidden z-0 "
      />
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 my-10 mx-32 place-items-center z-10">
        {detailedPokemons.map((pokemon) => (
          <PokemonListItem key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default AllPokemon;
