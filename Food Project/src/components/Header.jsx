import { Link, useLocation } from "react-router-dom";
import logo2 from "../assets/logo2.png";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserButton from "./UserButton";

const Header = () => {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(location.pathname);

  const { userData } = useSelector((state) => state.userStorage);
  //   console.log(userData?.stsTokenManager);
  const { cartItems } = useSelector((state) => state.cart);
  useEffect(() => {
    setSelectedTab(location.pathname);
  }, [location]);

  return (
    <header
      style={{ backgroundColor: "rgb(0, 73, 82)" }}
      className="w-full h-[11vh] flex justify-between items-center p-4 text-white px-8 fixed top-0 left-0 z-10"
    >
      <div>
        <img src={logo2} alt="Logo" className="w-12 cursor-pointer" />
      </div>

      <ul className="flex space-x-8 text-lg">
        <li
          className={`duration-300 ${
            selectedTab === "/"
              ? "text-yellow-300 underline"
              : "hover:text-amber-500"
          }`}
        >
          <Link to="/">Home</Link>
        </li>
        <li
          className={`duration-300 ${
            selectedTab === "/Reviews"
              ? "text-yellow-400 underline"
              : "hover:text-amber-500"
          }`}
        >
          <Link to="/Reviews">Reviews</Link>
        </li>
        <li
          className={`duration-300 relative ${
            selectedTab === "/Cart"
              ? "text-yellow-500 underline"
              : "hover:text-amber-500"
          }`}
        >
          <Link to="/Cart">
            Cart
            {cartItems.length > 0 && (
              <span className="ml-1 bg-red-500 text-white rounded-full text-xs px-1 absolute">
                {cartItems.length}
              </span>
            )}
          </Link>
        </li>
      </ul>

      {!userData || !userData.stsTokenManager?.accessToken ? (
        <div className="flex gap-x-5">
          <button className="hover:text-amber-100 hover:bg-amber-800 duration-200 bg-amber-300 text-amber-800 px-4 py-1 rounded-md font-semibold">
            <Link to="/LoginSignUp">Login / SignUp</Link>
          </button>
        </div>
      ) : (
        <div>
          <UserButton />
        </div>
      )}
    </header>
  );
};

export default Header;
