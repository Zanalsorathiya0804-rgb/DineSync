import React, { useState, useEffect } from 'react';
import '../../styles/restaurant/Tablebookings.css';

function Tablebookings() {
  const [restaurantName, setRestaurantName] = useState('');
  const [numOfTables, setNumOfTables] = useState(0);
  const [tableDetails, setTableDetails] = useState([]);

  // Whenever number of tables changes, initialize table details
  useEffect(() => {
    const newTables = Array.from({ length: numOfTables }, (_, index) => ({
      seating: tableDetails[index]?.seating || '',
      location: tableDetails[index]?.location || '',
      bookedBy: tableDetails[index]?.bookedBy || '',
    }));
    setTableDetails(newTables);
  }, [numOfTables]);

  // Handle table details change (seating and location)
  const handleTableDetailsChange = (e, index, field) => {
    const updatedTables = [...tableDetails];
    updatedTables[index][field] = e.target.value;
    setTableDetails(updatedTables);
  };

  // Handle saving table data to localStorage
  const handleSaveData = () => {
    if (restaurantName && tableDetails.length > 0) {
      localStorage.setItem(restaurantName, JSON.stringify(tableDetails));
      alert('Tables saved successfully!');
    } else {
      alert('Please provide restaurant name and table details.');
    }
  };

  return (
    <div className="tablebookings-container">
      <h2>Restaurant Table Setup</h2>

      {/* Restaurant Name Input */}
      <input
        type="text"
        value={restaurantName}
        onChange={(e) => setRestaurantName(e.target.value)}
        placeholder="Restaurant Name"
        className="input-field"
      />

      {/* Number of Tables */}
      <input
        type="number"
        value={numOfTables}
        onChange={(e) => setNumOfTables(Number(e.target.value))}
        placeholder="Number of Tables"
        className="input-field"
        min="0"
      />

      {/* Table Details */}
      {tableDetails.map((table, index) => (
        <div className="table-details" key={index}>
          <input
            type="number"
            value={table.seating}
            onChange={(e) => handleTableDetailsChange(e, index, 'seating')}
            placeholder="Seats per Table"
            className="input-field"
          />

          <select
            value={table.location}
            onChange={(e) => handleTableDetailsChange(e, index, 'location')}
            className="input-field"
          >
            <option value="">Select Location</option>
            <option value="window">Window Side</option>
            <option value="pool">Pool Side</option>
          </select>
        </div>
      ))}

      {/* Save Data Button */}
      <button
        onClick={handleSaveData}
        className="save-btn"
      >
        Save Tables
      </button>

      {/* Display Table List */}
      <div className="table-list">
        {tableDetails.map((table, index) => (
          <div key={index} className="table">
            <p>Table {index + 1} - Seats: {table.seating} - Location: {table.location}</p>
            <p>{table.bookedBy ? `Booked by: ${table.bookedBy}` : 'Available'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tablebookings;
