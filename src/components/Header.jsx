import logo from "../assets/images/pokemon_logo.png";
import { Link } from "react-router-dom";
const Header = ({ username }) => {
  return (
    <div
      className="sticky top-0 z-10 bg-white p-5 w-full"
      style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
    >
      <div className="flex items-center justify-between">
        <div className="w-auto self-start text-sm">
          <Link to="/">
            <span>Not </span>
            <span className="font-semibold ">{username}</span>
            <span> ?</span>
          </Link>
        </div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Link to="/home">
            <img src={logo} alt="Pokeball" className="w-[250px] h-auto" />
          </Link>
        </div>
        <div className="w-auto text-black text-right">
          <div>
            Hello, trainer <span className="font-bold">{username}</span>
          </div>
          <div className="mt-2">
            <Link
              to="/home/leaderboard"
              className="bg-red-600 text-white p-2 pl-5 pr-5 rounded-full inline-block hover:bg-black transition"
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
