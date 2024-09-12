const PokemonListItem = ({ pokemon }) => {
  //console.log(pokemon.types[0].type.name);
  const firstType = pokemon.types[0].type.name;
  const bgColorMap = {
    normal: "#BE768A",
    fighting: "#FE6E44",
    flying: "#94B2C7",
    poison: "#A971F0",
    ground: "#D08831 ",
    rock: "#A43E19",
    bug: "#45A043",
    ghost: "#906791",
    steel: "#1DB07F",
    fire: "#FF5C5C",
    water: "#6DCBFF",
    grass: "#06DA81",
    electric: "#FFDC62",
    psychic: "#F334C9",
    ice: "#ADE3FB",
    dragon: "#62CAD9",
    dark: "#595978",
    fairy: "#FA5295",
    stellar: "#33336B",
    unknown: "#707070",
  };

  const bgColorClass = bgColorMap[firstType];

  return (
    <div
      style={{ backgroundColor: bgColorClass }}
      className="relative pt-2 px-4 w-56 h-40 rounded-xl overflow-hidden shadow-md"
    >
      <div id="details" className="z-10 flex flex-col">
        <h3 className="mb-3 capitalize font-bold text-xl text-white">
          {pokemon.name}
        </h3>
        <div id="types" className="flex flex-col gap-3">
          {pokemon.types.map((type) => (
            <span
              key={type.slot}
              className="bg-white/60 text-gray-500 px-3 py-1 rounded-full text-sm self-start capitalize"
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 -right-2">
        <img
          src={pokemon.sprites.front_shiny}
          alt={pokemon.name}
          className="h-36 z-20"
        />
      </div>
      <div className="absolute inset-20 w-72 h-20 bg-white transform -rotate-12 -translate-y-5 -translate-x-24 z-0 opacity-15"></div>
    </div>
  );
};

export default PokemonListItem;
