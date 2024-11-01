import { auth, googleProvider } from "../config/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import googleLogo from "../assets/googleIcon.png";
import { useDispatch } from "react-redux";
import { addUserData, isUserLoggedIn } from "../store/storageSlice";
import { useNavigate } from "react-router-dom";

const LoginSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Email and Password are required!");
      return;
    }
  
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
  
    setError("");
    setLoading(true);
    try {
      let user;
      if (isLogin) {
        // Login mode
        const res = await signInWithEmailAndPassword(auth, email, password);
        user = res.user;
        dispatch(
          addUserData({
            email: user.email,
            stsTokenManager: user.stsTokenManager,
          })
        );
      } else {
        // Register mode
        const res = await createUserWithEmailAndPassword(auth, email, password);
        user = res.user;
        dispatch(
          addUserData({
            email: user.email,
            stsTokenManager: user.stsTokenManager,
          })
        );
      }
  
      dispatch(isUserLoggedIn(true));
      localStorage.setItem("authToken", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  const signInWithGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      dispatch(addUserData(user));
      dispatch(isUserLoggedIn(true));
      localStorage.setItem("authToken", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const handleSkip = () => {
    navigate("/");
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center"
      style={{
        background: "linear-gradient(125deg, #191970, #0a0e3a 60%, #0f1450)",
      }}
    >
      <form
        className="w-full max-w-md mx-auto p-8 bg-gradient-to-r from-teal-800 to-teal-600 rounded-lg shadow-lg flex flex-col space-y-6"
      >
        <h2 className="text-white text-2xl font-bold text-center">
          {isLogin ? "Welcome Back!" : "Create an Account"}
        </h2>

        <label htmlFor="email" className="text-white font-medium">
          Email:
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email.."
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-teal-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300"
        />

        <label htmlFor="password" className="text-white font-medium">
          Password:
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password.."
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-teal-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300"
        />

        {/* Confirm Password field, only shown in Register mode */}
        {!isLogin && (
          <>
            <label htmlFor="confirmPassword" className="text-white font-medium">
              Confirm Password:
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password.."
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="border border-teal-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300"
            />
          </>
        )}

        {error && <p className="text-red-400 text-sm">{error}</p>}

        {loading ? (
          <p className="text-white text-sm">Loading...</p>
        ) : (
          <>
            <button
              type="button"
              onClick={handleAuth}
              className="bg-dark-beige text-teal-100 rounded-lg py-2 hover:bg-teal-100 hover:text-teal-500 shadow transition duration-300"
            >
              {isLogin ? "Login" : "Register"}
            </button>
            <button
              type="button"
              onClick={signInWithGoogle}
              className="bg-dark-beige text-teal-100 rounded-lg py-2 hover:bg-teal-100 hover:text-teal-500 shadow transition duration-300 flex justify-center items-center gap-x-3"
            >
              Sign In with{" "}
              <img src={googleLogo} alt="Google Logo" className="w-8" />
            </button>

            <div className="text-center text-white mt-4">
              <p>
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-teal-200 underline hover:text-teal-100 transition duration-300"
                >
                  {isLogin ? "Register" : "Login"}
                </button>
              </p>
              
              {/* New "Want to skip for now?" text */}
              <p className="text-teal-200 mt-2">
                Want to skip for now?{" "}
                <span
                  onClick={handleSkip}
                  className="underline cursor-pointer hover:text-teal-100 transition duration-300"
                >
                  Skip
                </span>
              </p>
            </div>
          </>
        )}
      </form>
    </div>
);

};

export default LoginSignUp;
