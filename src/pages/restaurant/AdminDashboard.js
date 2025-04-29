import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RestaurantsContext } from '../../context/RestaurantsContext';
import '../../styles/restaurant/AdminDashboard.css';

const AdminDashboard = () => {
  // Access restaurants context
  const { restaurants = [], error, addRestaurant } = useContext(RestaurantsContext);

  // Local state for form data
  const [form, setForm] = useState({
    name: '', address: '', city: '', state: '', type: ''
  });

  // State for form submission errors
  const [submitError, setSubmitError] = useState('');

  // Navigation hook
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await addRestaurant(form); // Add new restaurant using context method
      setForm({ name: '', address: '', city: '', state: '', type: '' }); // Clear form
      setSubmitError('');
    } catch (err) {
      console.error(err);
      setSubmitError('Failed to add restaurant.');
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Add Restaurant Details</h1>

      {/* Show any fetch or submit errors */}
      {(error || submitError) && (
        <p className="error">{submitError || error}</p>
      )}

      {/* Restaurant addition form */}
      <form className="admin-form" onSubmit={handleSubmit}>
        <input name="name"     placeholder="Restaurant Name" value={form.name}     onChange={handleChange} required />
        <input name="address"  placeholder="Exact Address"    value={form.address}  onChange={handleChange} required />
        <input name="city"     placeholder="City"             value={form.city}     onChange={handleChange} required />
        <input name="state"    placeholder="State"            value={form.state}    onChange={handleChange} required />
        <input name="type"     placeholder="Food Type (e.g. Italian)" value={form.type} onChange={handleChange} required />

        <button type="submit">Add</button>
      </form>

      {/* Navigate to Live Menu Control page */}
      <button
        className="live-menu-btn"
        onClick={() => navigate('/livemenucontrol')}
      >
        Add Live Menu
      </button>

      {/* List of existing restaurants */}
      <h2>Existing Restaurants</h2>
      <ul className="restaurant-list">
        {restaurants.length > 0 ? (
          restaurants.map(r => (
            <li key={r.id}>
              <strong>{r.name}</strong><br />
              <span className="address">{r.address}</span><br />
              {r.city}, {r.state} — <em>{r.type}</em>
            </li>
          ))
        ) : (
          <p>No restaurants yet.</p>
        )}
      </ul>
    </div>
  );
};

export default AdminDashboard;
