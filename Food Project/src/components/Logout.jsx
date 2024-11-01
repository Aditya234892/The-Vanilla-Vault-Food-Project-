// authService.js
import { signOut } from "firebase/auth";
import { auth } from "../config/FirebaseConfig";
import { addUserData, isUserLoggedIn } from "../store/storageSlice";

export const logOut = async (dispatch, setLoading, setError, navigate) => {
  setError("");
  setLoading(true);

  try {
    // Sign out the user from Firebase
    await signOut(auth);

    // Remove saved tokens and user data from local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    // Update Redux state to remove user data and set login status to false
    dispatch(addUserData(null));
    dispatch(isUserLoggedIn(false));

    navigate("/LoginSignUp");
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
