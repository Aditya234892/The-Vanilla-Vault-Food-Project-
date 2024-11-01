import React, { useState, useEffect } from "react";
import { DialogPanel, Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCartItemQuantity,
  removeItemFromCart,
  resetCart,
} from "../store/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { addUserData, isUserLoggedIn } from "../store/storageSlice";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.userStorage);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();

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
  }, [dispatch]);

  const handleQuantityChange = (name, quantity) => {
    if (quantity < 1) {
      dispatch(removeItemFromCart(name));
    } else {
      dispatch(updateCartItemQuantity({ name, quantity }));
    }
  };

  const handleCheckoutBtn = () => {
    setIsOpen(true);
  };

  const handlePayBtn = () => {
    setIsOpen(false);
    setIsSuccessModalOpen(true);
    setCountdown(5); // Reset countdown
  };

  useEffect(() => {
    let timer;
    if (isSuccessModalOpen && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      // Redirect to homepage after 5 seconds
      navigate("/");
      dispatch(resetCart()); // Reset the cart items
      setIsSuccessModalOpen(false); // Close the modal
    }

    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, [isSuccessModalOpen, countdown, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-teal-500 to-teal-700">
      {/* Main Content */}
      <div className="container mt-20 mx-auto px-4 py-6 flex-grow">
        {/* Cart Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cartItems.length ? (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="rounded-lg shadow-lg p-4"
                style={{ backgroundColor: "#F1E4D3" }}
              >
                <div
                  className="bg-cover bg-center rounded-md h-48 mb-2"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
                <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-700 font-bold">Price: ₹{item.price}</p>
                <p className="text-gray-700">Free Delivery</p>
                <p className="text-gray-700">Preparation Time: 20-30 mins</p>

                <div className="flex items-center mt-4">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.name, item.quantity - 1)
                    }
                    className="bg-red-500 text-white rounded-md px-2 py-1 hover:bg-red-600"
                  >
                    -
                  </button>
                  <span className="mx-2 text-lg">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.name, item.quantity + 1)
                    }
                    className="bg-green-500 text-white rounded-md px-2 py-1 hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-5 mt-5">
              <p
                className="text-center text-5xl font-bold"
                style={{ fontFamily: "Dancing Script" }}
              >
                Your cart is empty.
              </p>
            </div>
          )}
        </div>

        {/* Total and Checkout Button */}
        {cartItems.length > 0 && (
          <div className="text-center mt-8">
            <h2 className="text-2xl font-bold">Total Amount: ₹{totalAmount}</h2>
            <button
              onClick={handleCheckoutBtn}
              className="bg-green-500 text-white rounded-md px-6 py-2 mt-4 hover:bg-green-600"
            >
              Proceed to Checkout
            </button>
          </div>
        )}

        {/* Modal for Order */}
        <Dialog
          open={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          className="relative z-50  bg-gradient-to-br from-teal-500 to-teal-700"
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            aria-hidden="true"
          />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md p-6 bg-white rounded-lg">
              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <h3 className="text-2xl font-bold mb-4 text-amber-700">
                Your order has been successfully placed!
              </h3>
              <p className="text-lg text-amber-600">
                Redirecting to homepage in <span className="text-xl text-red-800"> {countdown} </span> seconds...
              </p>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Modal for address*/}
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            aria-hidden="true"
          />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md p-6 bg-white rounded-lg">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>

              {isLoggedIn ? (
                // Checkout Form
                <>
                  {/* Video */}
                  <div className="w-full h-48 mb-4">
                    <video
                      loop
                      autoPlay
                      muted
                      className="w-full h-full object-cover rounded-md"
                    >
                      <source
                        src="https://cdn.dribbble.com/users/2874478/screenshots/15675229/media/3d60f9c652584e5ad0b637ec3db2f2fa.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  {/* Form */}
                  <h3 className="text-xl font-bold mb-4">Enter Your Details</h3>
                  <form className="space-y-4">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Name"
                        className="w-1/2 p-2 border rounded"
                      />
                      <input
                        type="text"
                        placeholder="Address"
                        className="w-1/2 p-2 border rounded"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="City"
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Postal Code"
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="number"
                      placeholder="Phone"
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Landmark (Optional)"
                      className="w-full p-2 border rounded"
                    />

                    <button
                      type="submit"
                      onClick={handlePayBtn}
                      className="w-full bg-green-500 text-white p-2 rounded mt-4"
                    >
                      Pay ₹{totalAmount}
                    </button>
                  </form>
                </>
              ) : (
                // Login / SignUp Button
                <div className="text-center mt-4">
                  <p className="text-lg mb-4">
                    Please log in to proceed to checkout.
                  </p>
                  <button
                    className="hover:text-amber-100 hover:bg-amber-800 duration-200 bg-amber-300 text-amber-800 px-4 py-1 rounded-md font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to="/LoginSignUp">Login / SignUp</Link>
                  </button>
                </div>
              )}
            </DialogPanel>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Cart;
