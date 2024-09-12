const Header = ({ username }) => {
  return (
    <>
      <div className="bg-white flex items-center justify-between p-5">
        <div className="float-start w-auto">
          <img
            src="./src/assets/images/menu_icon.png"
            alt="Pokeball"
            className="w-24 h-auto"
          />
        </div>
        <div className="text-center">
          <img
            src="./src/assets/images/pokemon_logo.png"
            alt="Pokeball"
            className="w-2/4 h-auto"
          />
        </div>
        <div className="float-right w-auto text-black">
          Hello, trainer <span className="font-bold">{username}</span>
        </div>
      </div>
    </>
  );
};

export default Header;
