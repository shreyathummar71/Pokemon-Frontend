import { Link } from "react-router-dom";

const Header = ({ username, toggleDrawer, isOpen }) => {
  return (
    <div
      className="relative z-10 bg-white p-5 w-full"
      style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
    >
      <div className="flex items-center justify-between">
        <div className="w-auto">
          <button
            type="button"
            onClick={toggleDrawer}
            aria-controls="drawer-navigation"
            aria-expanded={isOpen}
          >
            <img
              src="./src/assets/images/menu_icon.png"
              alt="Menu Icon"
              className="w-24 h-auto"
            />
          </button>
        </div>
        <div className="flex-grow flex justify-center">
          <Link to="/home">
            <img
              src="./src/assets/images/pokemon_logo.png"
              alt="Pokemon Logo"
              className="w-2/4 h-auto"
            />
          </Link>
        </div>
        <div className="w-auto text-black text-right">
          <div>
            Hello, trainer <span className="font-bold">{username}</span>
          </div>
          <div className="mt-2">
            <Link
              to="/home/leaderboard"
              className="bg-red-600 text-white p-2 pl-5 pr-5 rounded-full inline-block hover:bg-black"
            >
              Score
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
