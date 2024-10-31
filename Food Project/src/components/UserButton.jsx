import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "./Logout"; // Adjust path if necessary

const UserButton = () => {
  const [nameInput, setNameInput] = useState(""); // State to hold the input value
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { userData } = useSelector((state) => state.userStorage);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle the change in input field
  const handleInputChange = (e) => {
    setNameInput(e.target.value);
  };

  // Function to handle the submission of the name input
  const handleNameSubmit = () => {
    // Logic to store/display the name can go here
    setNameInput(""); // Reset the input field
    setIsModalOpen(false); // Close the modal
  };

  // Logout function
  const handleLogout = () => {
    logOut(dispatch, setLoading, setError, navigate); // Call logOut with the necessary parameters
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => setIsModalOpen((prev) => !prev)} // Toggle modal visibility
        className="bg-teal-950 p-4 rounded-full text-amber-300 flex items-center justify-center hover:bg-teal-600"
        aria-label="Open name input"
      >
        {userData?.displayName ? (
          `${userData.displayName.split(" ")[0][0]}${userData.displayName.split(" ")[1][0]}`
        ) : (
          "?" 
        )}
      </button>

      {/* Modal for name input */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-y-4 max-w-md mx-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {!userData?.displayName && (
              <div>
                <h2 className="text-xl mb-4">Enter Your Name</h2>
                <input
                  type="text"
                  placeholder="Your name"
                  value={nameInput}
                  onChange={handleInputChange}
                  className="border-2 border-gray-300 p-2 rounded mb-4 w-full text-amber-800"
                />
                <div className="flex justify-between mb-4">
                  <button
                    onClick={handleNameSubmit} // Handles name submission
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsModalOpen(false)} // Closes the modal
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>

            {/* Logout button now inside the modal */}
            <button
              onClick={handleLogout} // Calls the onLogout function when clicked
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 w-full"
            >
              Logout
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default UserButton;
