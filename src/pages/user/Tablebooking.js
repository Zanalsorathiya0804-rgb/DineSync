import React, { useState, useEffect } from 'react'; // Import React and hooks for state management and side effects
import '../../styles/user/Tablebooking.css'; // Import custom CSS styles for the Tablebooking component

function Tablebooking() {
  // State to manage the restaurant name entered by the user
  const [restaurantName, setRestaurantName] = useState('');

  // State to store the list of available tables for the restaurant
  const [restaurantTables, setRestaurantTables] = useState([]);

  // State to store the user's name entered for booking the table
  const [userName, setUserName] = useState('');

  // State to track the selected table for food preordering
  const [selectedTable, setSelectedTable] = useState(null);

  // Simulate fetching tables for the entered restaurant name
  useEffect(() => {
    if (restaurantName) {
      // Fetch the tables from localStorage (simulating an API call)
      const fetchedTables = JSON.parse(localStorage.getItem(restaurantName) || '[]');
      setRestaurantTables(fetchedTables); // Update the state with the fetched tables
    }
  }, [restaurantName]); // Re-run this effect whenever restaurantName changes

  // Function to handle table booking
  const handleBookTable = (index) => {
    if (!userName) {
      // Check if the user has entered a name before booking
      alert("Please enter your name.");
      return;
    }

    const updatedTables = [...restaurantTables]; // Make a copy of the current tables array
    updatedTables[index].bookedBy = userName; // Book the selected table for the user
    setRestaurantTables(updatedTables); // Update state with the new table status

    // Save the updated table details to localStorage (simulating saving to a database)
    localStorage.setItem(restaurantName, JSON.stringify(updatedTables));
    alert(`Table booked successfully for ${userName}!`); // Alert user that the table was booked successfully
  };

  // Function to handle redirect to food preorder
  const handlePreorderFood = () => {
    if (!selectedTable) {
      // Check if the user has selected a table for preordering food
      alert("Please select a table to preorder food.");
      return;
    }
    // Simulate redirect or action for preordering food
    alert("Redirecting to Preorder Food page..."); // Placeholder for actual redirect
  };

  return (
    <div className="user-tablebooking-container">
      <h2>User Table Booking</h2>

      {/* Input field for entering the restaurant name */}
      <input
        type="text"
        value={restaurantName}
        onChange={(e) => setRestaurantName(e.target.value)} // Update restaurant name state
        placeholder="Enter Restaurant Name"
        className="input-field"
      />

      {/* Display the list of available tables */}
      {restaurantTables.length > 0 ? (
        <div className="tables">
          {restaurantTables.map((table, index) => (
            <div key={index} className="table">
              <p>Table {index + 1} - Seats: {table.seating} - Location: {table.location}</p>
              {/* Display if the table is already booked or available */}
              <p>{table.bookedBy ? `Booked by: ${table.bookedBy}` : 'Available'}</p>
              {!table.bookedBy && (
                // Show booking button only for available tables
                <button onClick={() => handleBookTable(index)} className="book-btn">
                  Book Table
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        // Show message if no tables are available for the selected restaurant
        <p>No tables available for this restaurant.</p>
      )}

      {/* Input field for entering the user's name */}
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)} // Update user name state
        placeholder="Enter Your Name"
        className="input-field"
      />

      {/* Button to navigate to the food preorder page */}
      <button onClick={handlePreorderFood} className="preorder-btn">
        Preorder Food
      </button>
    </div>
  );
}

export default Tablebooking;
