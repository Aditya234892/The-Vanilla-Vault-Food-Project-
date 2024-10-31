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

    // Remove any saved token or data from local storage
    localStorage.removeItem("authToken");

    // Update Redux state to remove user data and set login status to false
    dispatch(addUserData(null));
    dispatch(isUserLoggedIn(false));

    // Redirect user to login/signup page
    navigate("/");
  } catch (err) {
    // If there's an error, set the error message
    setError(err.message);
  } finally {
    // Set loading to false once done
    setLoading(false);
  }
};
