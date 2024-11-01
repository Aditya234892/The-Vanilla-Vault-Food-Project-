import logo1 from "../assets/logo1.png";
import "animate.css";
import Dishes from "./Service";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserData, isUserLoggedIn } from "../store/storageSlice";
import TimeOutPopUp from "./timeOutPopUp";

const Home = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showPopUp, setShowPopUp] = useState(false); // State to control the popup visibility

  const {userData} = useSelector((state) => state.userStorage);
  console.log(userData);

  const checkIfUserLoggedIn = async () => {
    const authToken = localStorage.getItem("authToken");
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (authToken && savedUser) {
      dispatch(addUserData(savedUser));
      dispatch(isUserLoggedIn(true));
    } else {
      console.log("No user logged in or user data not found");
    }
  };

  useEffect(() => {
    checkIfUserLoggedIn();

    // Show popup after 5 seconds if user is not logged in
    const timer = setTimeout(() => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setShowPopUp(true);
      }
    }, 5000);

    // Clean up timer when component unmounts
    return () => clearTimeout(timer);
  }, [dispatch]);

  // Debouncing the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  return (
    <section
      className="mt-20 p-4 overflow-x-hidden"
      style={{
        background: "linear-gradient(165deg, #003C47, #005F63, #007D7A)",
      }}
    >
      <h1
        className="text-center text-3xl font-bold animate__animated animate__fadeIn animate__delay-1s animate__slower text-amber-300"
        style={{ fontFamily: "Dancing Script" }}
      >
        Bringing You the True Taste of Authenticity.
      </h1>

      <div
        className="flex flex-col md:flex-row justify-between mt-4 p-4 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700"
      >
        <div
          className="w-full md:w-2/5 bg-cover bg-center animate__animated animate__bounceInLeft rounded-xl"
          style={{
            backgroundImage: `url(${logo1})`,
          }}
        />
        
        <div className="p-4 flex justify-center items-center w-full md:w-1/3">
          <h1
            style={{ fontFamily: "Dancing Script" }}
            className="text-5xl animate__animated animate__tada text-amber-200 text-center"
          >
            Savor,
            <br />
            <br /> Relish,
            <br />
            <br /> Repeat
          </h1>
        </div>
        
        <video
          loop
          autoPlay
          muted
          className="rounded-lg shadow-lg animate__animated animate__bounceInRight w-full md:w-2/5 h-auto"
        >
          <source
            src="https://cdn.dribbble.com/users/319371/screenshots/11984807/media/05cad6c3ffff65f9142bf2958b941171.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="mt-4 flex flex-col p-4">
        <label
          htmlFor="searchInput"
          style={{ color: "#D4A374", fontFamily: "Graduate" }}
          className="text-2xl font-semibold mb-2"
        >
          Type Your Flavor Adventure!
        </label>
        
        <input
          type="text"
          value={search}
          id="searchInput"
          className="h-10 px-3 text-lg font-semibold rounded-md"
          placeholder="Still Waiting..."
          onChange={(e) => setSearch(e.target.value)}
          style={{ color: "#A52A2A" }}
        />
      </div>
      
      <Dishes search={debouncedSearch} />
      
      {/* Conditionally render the TimeOutPopUp if showPopUp is true */}
      {showPopUp && <TimeOutPopUp />}
    </section>
  );
};

export default Home;
