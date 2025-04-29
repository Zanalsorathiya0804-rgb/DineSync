import React, { createContext, useState, useEffect } from 'react';

// Create a Context to manage restaurant-related data globally
export const RestaurantsContext = createContext();

// Provider component to wrap children that need access to restaurants data
export const RestaurantsProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]); // State to hold restaurant list
  const [error, setError] = useState(''); // State to capture any error during fetching

  // Fetch restaurants data when component mounts (can replace with real API later)
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // Simulated restaurant data
        const dummyData = [
          { id: 1, name: 'Pasta Palace', address: '123 Italy St', city: 'New York', state: 'NY', type: 'Italian' },
          { id: 2, name: 'Sushi Central', address: '456 Tokyo Ave', city: 'San Francisco', state: 'CA', type: 'Japanese' },
        ];
        setRestaurants(dummyData); // Populate restaurants state
      } catch (err) {
        setError('Failed to fetch restaurants.'); // Handle any fetch error
      }
    };

    fetchRestaurants();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to add a new restaurant to the list
  const addRestaurant = async (newRestaurant) => {
    try {
      // Auto-generate a new ID based on last restaurant's ID
      const id = restaurants.length ? restaurants[restaurants.length - 1].id + 1 : 1;
      const restaurantWithId = { id, ...newRestaurant };
      setRestaurants(prev => [...prev, restaurantWithId]); // Add to existing restaurants
    } catch (err) {
      throw new Error('Add restaurant failed'); // Error handling
    }
  };

  // Provide restaurant data, error status, and add functionality to all children components
  return (
    <RestaurantsContext.Provider value={{ restaurants, error, addRestaurant }}>
      {children}
    </RestaurantsContext.Provider>
  );
};
