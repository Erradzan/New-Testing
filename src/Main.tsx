import React, { useState } from 'react';
import useFetchRecipe from './useFetchRecipe'; // Import the custom hook
import DisplayRecipe from './DisplayRecipe';

const Main: React.FC = () => {
  const { meal, loading, error, fetchRecipe } = useFetchRecipe(); // Use the custom hook
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleShowModal = () => {
    setShowModal(true);
    fetchRecipe(); // Use the custom hook's function to fetch a recipe
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="h-screen flex items-center justify-center p-4">
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={handleShowModal}
      >
        Show Random Recipe
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 relative max-h-[80vh] overflow-y-auto">
            <span
              className="absolute top-2 right-2 cursor-pointer text-2xl"
              onClick={handleCloseModal}
            >
              &times;
            </span>
            <DisplayRecipe meal={meal} loading={loading} error={error} />
            <button
              className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={fetchRecipe} // Use the custom hook's function to fetch another recipe
            >
              Show Another Recipe
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;