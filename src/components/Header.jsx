import logo from "../assets/images/pokemon_logo.png";
import menuItem from "../assets/images/menu_icon.png";
const Header = ({ username, toggleDrawer, isOpen, showHeader }) => {
  return (
    <>
      <div className="bg-white flex items-center justify-between p-5">
        <div className="float-start w-auto">
          <button
            type="button"
            onClick={toggleDrawer}
            aria-controls="drawer-navigation"
            aria-expanded={isOpen}
          >
            <img src={menuItem} alt="Pokeball" className="w-24 h-auto" />
          </button>
        </div>
        <div className="text-center">
          <img src={logo} alt="Pokeball" className="w-2/4 h-auto" />
        </div>
        <div className="float-right w-auto text-black">
          Hello, trainer <span className="font-bold">{username}</span>
        </div>
      </div>
    </>
  );
};

export default Header;
