import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RestaurantsContext } from '../../context/RestaurantsContext';
import '../../styles/user/HomeDashboard.css';

const HomeDashboard = () => {
  // Retrieve restaurant data and any potential errors from context
  const { restaurants = [], error } = useContext(RestaurantsContext);

  // Local state for filtering by state and city
  const [stateFilter, setStateFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  
  // Navigate function for handling routing to the live menu page
  const navigate = useNavigate();

  // Generate a unique list of states from the restaurant data
  const states = [...new Set(restaurants.map(r => r.state))];
  
  // Generate a list of cities based on selected state (if applicable)
  const cities = stateFilter
    ? [...new Set(restaurants.filter(r => r.state === stateFilter).map(r => r.city))]
    : [...new Set(restaurants.map(r => r.city))];

  // Filter restaurants based on selected state and city
  const filtered = restaurants.filter(r =>
    (!stateFilter || r.state === stateFilter) &&
    (!cityFilter || r.city === cityFilter)
  );

  return (
    <div className="home-dashboard-scrollable"> {/* Container for the scrollable dashboard */}
      <div className="home-dashboard">
        <h1>Restaurants</h1>
        
        {/* Display error message if there is any */}
        {error && <p className="error">{error}</p>}

        {/* Filters for state and city */}
        <div className="filters">
          <select
            value={stateFilter}
            onChange={e => { setStateFilter(e.target.value); setCityFilter(''); }} // Reset city filter when state changes
          >
            <option value="">All States</option>
            {/* Map through available states to create dropdown options */}
            {states.map(st => <option key={st} value={st}>{st}</option>)}
          </select>

          <select
            value={cityFilter}
            onChange={e => setCityFilter(e.target.value)} // Update city filter on change
            disabled={!stateFilter} // Disable city filter until a state is selected
          >
            <option value="">All Cities</option>
            {/* Map through available cities based on selected state */}
            {cities.map(ct => <option key={ct} value={ct}>{ct}</option>)}
          </select>
        </div>

        {/* List of filtered restaurants */}
        <div className="restaurant-list">
          {filtered.length > 0 ? (
            filtered.map(r => (
              <div key={r.id} className="restaurant-card">
                <h2>{r.name}</h2>
                <p className="address">{r.address}</p>
                <p>{r.city}, {r.state}</p>
                <p className="type">{r.type}</p>
              </div>
            ))
          ) : (
            <p className="no-results">
              {/* Show appropriate message based on whether restaurants are available */}
              {restaurants.length ? 'No restaurants match.' : 'Loading…'}
            </p>
          )}
        </div>

        {/* Button to navigate to the live menu page */}
        <div className="live-menu-section">
          <h2>Want to know about live menu + dish availability?</h2>
          <button
            className="live-menu-btn"
            onClick={() => navigate('/livemenu')} // Navigate to the live menu page
          >
            Go to Live Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
