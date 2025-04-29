import React, { createContext, useState, useContext } from 'react';

// Create a Context to manage live menu data across the app
const LiveMenuContext = createContext();

// This provider wraps child components to give them access to the live menu context
export const LiveMenuProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState({}); // Stores all restaurants and their dish lists

  // Adds a restaurant entry if it doesn't already exist in the context
  const addRestaurant = (restaurantName) => {
    if (!restaurants[restaurantName]) {
      setRestaurants({
        ...restaurants,
        [restaurantName]: [], // Initialize with an empty dish list
      });
    }
  };

  // Appends new dishes to the existing dish list for a given restaurant
  const addDishes = (restaurantName, dishes) => {
    setRestaurants({
      ...restaurants,
      [restaurantName]: [...restaurants[restaurantName], ...dishes], // Spread and merge new dishes
    });
  };

  // Removes a dish from a restaurant's menu based on its index
  const deleteDish = (restaurantName, index) => {
    const updatedDishes = restaurants[restaurantName].filter((_, i) => i !== index); // Filter out the target index
    setRestaurants({
      ...restaurants,
      [restaurantName]: updatedDishes,
    });
  };

  // Retrieves the dish list for a given restaurant, returns empty array if not found
  const getDishesByRestaurant = (restaurantName) => {
    return restaurants[restaurantName] || [];
  };

  // Expose all state-modifying and reading functions via context
  return (
    <LiveMenuContext.Provider
      value={{
        addRestaurant,
        addDishes,
        deleteDish,
        getDishesByRestaurant,
      }}
    >
      {children}
    </LiveMenuContext.Provider>
  );
};

// Custom hook to use the LiveMenuContext more cleanly in functional components
export const useLiveMenu = () => {
  return useContext(LiveMenuContext);
};
