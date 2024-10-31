import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { fireStore } from "../config/FirebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserData, isUserLoggedIn } from "../store/storageSlice";

const Reviews = () => {
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(reviews)

  const reviewsCollectionRef = collection(fireStore, "reviews");
  const { isLoggedIn, userData } = useSelector((state) => state.userStorage);

  const dispatch = useDispatch();

  const checkIfUserLoggedIn = async () => {
    const authToken = localStorage.getItem("authToken");
    const savedUser = JSON.parse(localStorage.getItem('user'));

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

  const handleClick = (value) => {
    setRating(value);
  };

  const handleMouseEnter = (value) => {
    setHover(value);
  };

  const handleMouseLeave = () => {
    setHover(0);
  };

  const renderStar = (index) => {
    const filledStar = index <= rating || (hover && index <= hover);
    const unfilledStar = index === Math.ceil(hover) && hover % 1 !== 0;

    return (
      <span
        key={index}
        onClick={() => handleClick(index)}
        onMouseEnter={() => handleMouseEnter(index - 0.5)}
        onMouseLeave={handleMouseLeave}
        className="cursor-pointer"
      >
        {filledStar || unfilledStar ? (
          <FontAwesomeIcon icon={solidStar} className="text-yellow-400" />
        ) : (
          <FontAwesomeIcon icon={regularStar} className="text-gray-300" />
        )}
      </span>
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      userName: userData.displayName,
      userImg: userData.photoURL,
      rating: rating,
      text: reviewText,
      timestamp: new Date(),
    };

    try {
      await addDoc(reviewsCollectionRef, newReview);
      fetchDocs();
    } catch (err) {
      console.log("Error", err);
    }

    setReviewText("");
    setRating(0);
  };

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const reviewsList = await getDocs(reviewsCollectionRef);
      const list = reviewsList.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setReviews(list);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <section className="bg-gradient-to-br from-teal-500 to-teal-700 mt-20 py-6 px-4 text-white min-h-screen">
      {isLoggedIn ? (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Write a Review
          </h2>
          <form onSubmit={handleFormSubmit} className="flex flex-col space-y-6">
            <div className="flex justify-center gap-x-3 mb-2 text-2xl">
              {[1, 2, 3, 4, 5].map((star) => renderStar(star))}
            </div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience..."
              required
              className="w-full h-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-md text-lg hover:bg-teal-700 transition duration-300"
            >
              Submit Review
            </button>
          </form>
        </div>
      ) : (
        <div className="w-fit mx-auto bg-white p-4 rounded-lg shadow-lg flex flex-col justify-center items-center animate__animated animate__backInDown">
          <h1 className="text-black">
            <button className="bg-amber-300 p-2 text-amber-800 font-semibold rounded-md mr-2">
              <Link to="/loginSignUp">Login/SignUp</Link>
            </button>
            Login/Register to write a Review
          </h1>
        </div>
      )}

      <div className="max-w-6xl mx-auto mt-8 bg-white p-4 rounded-lg shadow-lg flex flex-col justify-center items-center overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 underline">Reviews</h2>
        {loading ? (
          <p className="text-gray-700 text-lg font-bold">Loading reviews...</p>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="mb-4 w-full flex flex-col">
              <div className="border rounded-lg p-4 shadow-md bg-white">
                <div className="flex items-center mb-2">
                  <img
                    src={review.userImg}
                    alt={review.userName}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="font-semibold text-gray-800 text-xl">
                    {review.userName}
                  </span>
                  <div className="flex items-center ml-2">
                    {[...Array(review.rating)].map((_, index) => (
                      <FontAwesomeIcon
                        key={index}
                        icon={solidStar}
                        className="text-yellow-400 text-lg"
                      />
                    ))}
                    {[...Array(5 - review.rating)].map((_, index) => (
                      <FontAwesomeIcon
                        key={index}
                        icon={regularStar}
                        className="text-gray-300 text-lg"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 text-lg">{review.text}</p>
                <p className="text-sm text-gray-500">
                  {review.timestamp.toDate().toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No reviews yet.</p>
        )}
      </div>
    </section>
  );
};

export default Reviews;
