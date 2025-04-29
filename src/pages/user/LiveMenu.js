import React, { useState } from 'react';
import { useLiveMenu } from '../../context/LiveMenuContext'; // Custom hook for accessing live menu data from context
import { useNavigate } from 'react-router-dom'; // Hook to handle navigation to other pages
import '../../styles/user/LiveMenu.css'; // CSS specific to the LiveMenu component

const LiveMenu = () => {
  const { getDishesByRestaurant } = useLiveMenu(); // Destructuring to access the function for fetching dishes based on restaurant name
  const [restaurantName, setRestaurantName] = useState(''); // State to manage the input for the restaurant's name
  const [dishes, setDishes] = useState([]); // State to store the list of dishes retrieved from the restaurant
  const navigate = useNavigate(); // Navigation hook to move between routes/pages

  // Function to handle restaurant search and update dishes list based on the input restaurant name
  const handleSearchRestaurant = () => {
    const restaurantDishes = getDishesByRestaurant(restaurantName); // Fetch dishes related to the entered restaurant
    setDishes(restaurantDishes); // Update the state with the dishes
  };

  // Function to handle navigation to the table booking page
  const handleBookTable = () => {
    navigate('/Tablebooking'); // Navigate to the Tablebooking page
  };

  return (
    <div>
      <h1>User Side</h1> {/* Main heading to indicate the User Side of the application */}
      
      <div>
        <h3>Search for a Restaurant:</h3> {/* Label for restaurant search */}
        <input
          type="text"
          value={restaurantName} // Bind the input value to the restaurantName state
          onChange={(e) => setRestaurantName(e.target.value)} // Update state with the restaurant name as the user types
        />
        <button onClick={handleSearchRestaurant}>Search</button> {/* Button to trigger the search function */}
      </div>

      <div>
        <h3>Dishes in {restaurantName}:</h3> {/* Dynamic heading to show the dishes for the selected restaurant */}
        <ul>
          {dishes.length === 0 ? ( // Check if there are no dishes found
            <li>No dishes found for this restaurant.</li> // Message if no dishes match the search
          ) : (
            dishes.map((dish, index) => <li key={index}>{dish}</li>) // Display the dishes as a list if found
          )}
        </ul>
      </div>

      <button onClick={handleBookTable}>Book a Table</button> {/* Button to navigate to the table booking page */}
    </div>
  );
};

export default LiveMenu;
