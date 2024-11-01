import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-6xl font-bold text-gray-800 sm:text-8xl">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-600 sm:text-3xl">Page Not Found</h2>
        <p className="mt-2 text-gray-500 sm:text-lg">
          Sorry, the page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="mt-4 inline-block px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded transition duration-200 text-sm sm:text-base"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
