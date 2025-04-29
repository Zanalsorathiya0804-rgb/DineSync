import React, { useState } from 'react'; // Import React and useState for managing local component state
import { useOrder } from '../../context/OrderContext'; // Custom hook for managing orders from global context
import '../../styles/user/PreorderFood.css'; // CSS file specific to the PreorderFood component

function PreorderFood() {
  // Extract addOrder function from the global OrderContext to add orders to the context
  const { addOrder } = useOrder();
  
  // Local state for user inputs
  const [userName, setUserName] = useState(''); // State to manage user's name input
  const [restaurantName, setRestaurantName] = useState(''); // State to manage restaurant's name input
  const [dishes, setDishes] = useState([{ name: '', quantity: 0 }]); // State for managing dish names and quantities, starting with one empty dish
  const [arrivalTime, setArrivalTime] = useState(''); // State for managing arrival time input
  const [timesReached, setTimesReached] = useState(0); // State to track how many times the user has visited

  // Function to handle changes in dish name or quantity input
  const handleDishChange = (e, index) => {
    // Copy current dishes array to preserve immutability
    const updatedDishes = [...dishes];
    updatedDishes[index][e.target.name] = e.target.value; // Update the specific dish field (name or quantity)
    setDishes(updatedDishes); // Update state with modified dishes array
  };

  // Function to add a new dish input field to the form
  const addDish = () => {
    setDishes([...dishes, { name: '', quantity: 0 }]); // Add a new empty dish object to the dishes state array
  };

  // Function to handle the order submission
  const handleSubmit = () => {
    // Create the order object with all the input data
    const order = {
      userName,
      restaurantName,
      dishes,
      arrivalTime,
      timesReached,
    };

    // Add the order to the global OrderContext using addOrder
    addOrder(order);

    // Reset the form fields after order submission
    setUserName(''); // Clear the user name input
    setRestaurantName(''); // Clear the restaurant name input
    setDishes([{ name: '', quantity: 0 }]); // Reset dishes state to initial empty state
    setArrivalTime(''); // Clear the arrival time input
    setTimesReached(0); // Reset the timesReached counter
  };

  return (
    <div className="preorder-food-container">
      <h2>Preorder Food</h2> {/* Heading for the preorder food form */}
      
      {/* User's name input field */}
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)} // Update the userName state on input change
        placeholder="Enter your name" // Placeholder text for the input field
      />

      {/* Restaurant name input field */}
      <input
        type="text"
        value={restaurantName}
        onChange={(e) => setRestaurantName(e.target.value)} // Update the restaurantName state on input change
        placeholder="Enter restaurant name" // Placeholder text for the input field
      />

      {/* Dynamic list of dishes with inputs for each dish */}
      {dishes.map((dish, index) => (
        <div key={index} className="dish-input"> {/* Container for each dish input */}
          <input
            type="text"
            name="name"
            value={dish.name}
            onChange={(e) => handleDishChange(e, index)} // Update the dish name on change
            placeholder="Dish Name" // Placeholder for the dish name input
          />
          <input
            type="number"
            name="quantity"
            value={dish.quantity}
            onChange={(e) => handleDishChange(e, index)} // Update the dish quantity on change
            placeholder="Quantity" // Placeholder for the dish quantity input
          />
        </div>
      ))}
      {/* Button to add another dish input */}
      <button onClick={addDish}>Add Dish</button>

      {/* Arrival time input field */}
      <input
        type="text"
        value={arrivalTime}
        onChange={(e) => setArrivalTime(e.target.value)} // Update the arrivalTime state on input change
        placeholder="Enter arrival time" // Placeholder for the arrival time input
      />

      {/* Times reached input field */}
      <input
        type="number"
        value={timesReached}
        onChange={(e) => setTimesReached(Number(e.target.value))} // Update the timesReached state on input change
        placeholder="How many times reached" // Placeholder for the times reached input
      />

      {/* Submit button for the order */}
      <button onClick={handleSubmit} className="submit-button">Submit Order</button>
    </div>
  );
}

export default PreorderFood;
