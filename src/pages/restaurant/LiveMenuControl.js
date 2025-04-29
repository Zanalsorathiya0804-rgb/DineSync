import React, { useState } from 'react';
import { useLiveMenu } from '../../context/LiveMenuContext';
import '../../styles/restaurant/LiveMenuControl.css';

const LiveMenuControl = () => {
  const { addRestaurant, addDishes, deleteDish, getDishesByRestaurant } = useLiveMenu();

  const [restaurantName, setRestaurantName] = useState('');
  const [numDishes, setNumDishes] = useState(0); // Store how many dishes to add
  const [dishNames, setDishNames] = useState([]); // Store names of dishes to add

  // Update restaurant name state
  const handleRestaurantChange = (e) => {
    setRestaurantName(e.target.value);
  };

  // Update number of dishes and initialize dish names array
  const handleNumDishesChange = (e) => {
    const number = parseInt(e.target.value);
    setNumDishes(number);
    setDishNames(new Array(number).fill(''));
  };

  // Update a specific dish name at given index
  const handleDishChange = (index, e) => {
    const updatedDishes = [...dishNames];
    updatedDishes[index] = e.target.value;
    setDishNames(updatedDishes);
  };

  // Add restaurant and dishes
  const handleAddDishes = () => {
    if (restaurantName && dishNames.length > 0) {
      addRestaurant(restaurantName); // Ensure restaurant exists
      addDishes(restaurantName, dishNames);
      setDishNames(new Array(numDishes).fill('')); // Reset after adding
    }
  };

  // Delete a specific dish by index
  const handleDeleteDish = (index) => {
    deleteDish(restaurantName, index);
  };

  return (
    <div className="live-menu-control">
      <h1>Restaurant Side</h1>

      {/* Input: Restaurant Name */}
      <div className="input-group">
        <h3>Enter Restaurant Name:</h3>
        <input
          type="text"
          value={restaurantName}
          onChange={handleRestaurantChange}
          placeholder="Restaurant Name"
        />
      </div>

      {/* Input: Number of Dishes */}
      <div className="input-group">
        <h3>How many dishes do you want to add?</h3>
        <input
          type="number"
          value={numDishes}
          onChange={handleNumDishesChange}
          placeholder="Number of dishes"
          min="1"
        />
      </div>

      {/* Input: Dish Names */}
      {numDishes > 0 && (
        <div className="dishes-input">
          <h3>Enter the Dishes:</h3>
          {dishNames.map((dish, index) => (
            <input
              key={index}
              type="text"
              value={dish}
              onChange={(e) => handleDishChange(index, e)}
              placeholder={`Dish ${index + 1}`}
            />
          ))}
          <button onClick={handleAddDishes}>Add Dishes</button>
        </div>
      )}

      {/* Display Current Dishes */}
      <div className="current-dishes">
        <h3>Current Dishes for {restaurantName}:</h3>
        <ul>
          {getDishesByRestaurant(restaurantName).map((dish, index) => (
            <li key={index}>
              {dish}{' '}
              <button onClick={() => handleDeleteDish(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LiveMenuControl;
