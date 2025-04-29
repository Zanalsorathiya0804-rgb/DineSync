import React, { createContext, useState, useContext } from 'react';

// Create the OrderContext to manage order-related state globally
const OrderContext = createContext();

// Provider component that wraps parts of the app needing access to order data
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]); // Initialize orders as an empty array

  // Function to add a new order to the orders array
  const addOrder = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]); // Add new order while preserving previous orders
  };

  // Provide orders and addOrder function to all children components
  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook for accessing OrderContext easily inside functional components
export const useOrder = () => {
  return useContext(OrderContext);
};
