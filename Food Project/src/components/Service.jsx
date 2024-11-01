import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, updateCartItemQuantity, removeItemFromCart } from "../store/cartSlice"; // Import remove action

const ApiKey = import.meta.env.VITE_API_KEY;
const AppId = import.meta.env.VITE_APP_ID;

const Service = ({ search }) => {
  const [data, setData] = useState([]);
  const [prices, setPrices] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadMoreCount, setLoadMoreCount] = useState(0);
  const [localCart, setLocalCart] = useState({}); // Local state to manage cart items

  const {cartItems} = useSelector((state) => state.cart)
  console.log(cartItems)
  const dispatch = useDispatch();

  const foodCategories = [
    "indian",
    "pizza",
    "ice cream",
    "burger",
    "pasta",
    "salad",
    "tacos",
    "sushi",
    "steak",
    "sandwich",
  ];

  useEffect(() => {
    // Reset data when search changes
    if (search) {
      setData([]);
      setPrices([]);
      setRatings([]);
      fetchData(search);
    } else {
      fetchData(foodCategories[loadMoreCount % foodCategories.length]);
    }
  }, [loadMoreCount, search]);

  const fetchData = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${AppId}&app_key=${ApiKey}`
      );

      const newRecipes = response.data.hits;
      // console.log(newRecipes);
      const newPrices = Array.from(
        { length: newRecipes.length },
        () => Math.floor(Math.random() * (700 - 250 + 1)) + 250
      );
      const newRatings = Array.from(
        { length: newRecipes.length },
        () => Math.floor(Math.random() * 5) + 1
      );

      if (!search) {
        setData((prevData) => [...prevData, ...newRecipes]);
        setPrices((prevPrices) => [...prevPrices, ...newPrices]);
        setRatings((prevRatings) => [...prevRatings, ...newRatings]);
      } else {
        setData(newRecipes);
        setPrices(newPrices);
        setRatings(newRatings);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleCart = (recipe, index) => {
    const isItemInCart = localCart[recipe.label];
    const price = prices[index];

    if (isItemInCart) {
      // Remove item from cart
      setLocalCart((prev) => {
        const updatedCart = { ...prev };
        delete updatedCart[recipe.label];
        return updatedCart;
      });
      dispatch(removeItemFromCart(recipe.label));
    } else {
      // Add item to cart
      const cartItem = {
        name: recipe.label,
        price,
        image: recipe.image,
        quantity: 1,
      };
      setLocalCart((prev) => ({ ...prev, [recipe.label]: cartItem }));
      dispatch(addItemToCart(cartItem));
    }
  };

  const handleQuantityChange = (item, amount) => {
    const updatedQuantity = item.quantity + amount;
    if (updatedQuantity > 0) {
      setLocalCart((prev) => ({
        ...prev,
        [item.name]: {
          ...prev[item.name],
          quantity: updatedQuantity,
        },
      }));
      dispatch(updateCartItemQuantity({ name: item.name, quantity: updatedQuantity }));
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl">
      <h1
        className="text-4xl font-bold text-center my-6 text-amber-200"
        style={{ fontFamily: "Dancing Script" }}
      >
        Your Personal Food Court
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.length ? (
          data.map((hit, index) => {
            const localItem = localCart[hit.recipe.label];

            return (
              <div
                key={`${hit.recipe.uri}-${index}`}
                style={{ backgroundColor: "#F1E4D3" }}
                className="rounded-lg shadow-lg p-4 flex flex-col justify-between"
              >
                <div>
                  <div
                    className="bg-cover bg-center rounded-md h-48 mb-2 hover:scale-105 duration-150"
                    style={{ backgroundImage: `url(${hit.recipe.image})` }}
                  ></div>
                  <h2 className="text-xl font-semibold mb-2">{hit.recipe.label}</h2>
                  <p className="text-gray-700">Servings: {hit.recipe.yield}</p>
                  <p className="text-gray-700 font-bold">Price: ₹{prices[index]}</p>

                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`w-5 h-5 ${i < ratings[index] ? "text-yellow-500" : "text-gray-300"} star`}
                      >
                        &#9733;
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col mt-auto">
                  <a
                    href={hit.recipe.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 text-center"
                  >
                    View Recipe
                  </a>

                  <button
                    onClick={() => handleToggleCart(hit.recipe, index)}
                    className="inline-block mt-2 bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 hover:scale-105 duration-150 text-center"
                  >
                    {localItem ? "Remove from Cart" : "Add to Cart"}
                  </button>

                  {localItem && (
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => handleQuantityChange(localItem, -1)}
                        className="bg-red-500 text-white rounded-md px-2 py-1 hover:bg-red-600"
                      >
                        -
                      </button>
                      <span className="mx-2">{localItem.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(localItem, 1)}
                        className="bg-blue-500 text-white rounded-md px-2 py-1 hover:bg-blue-600"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center col-span-full p-4">
            <p className="text-center">Preparing Food for you!!</p>
          </div>
        )}
      </div>

      <div className="text-center mt-8">
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {!search && (
          <button
            onClick={() => setLoadMoreCount(loadMoreCount + 1)}
            className="bg-orange-500 text-white rounded-md px-6 py-2 hover:bg-orange-600"
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Service;
