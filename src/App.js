// Importing necessary libraries and components
import React, { useState } from 'react'; // React hooks for state management
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'; // React Router for routing
import './App.css'; // Styles for the app

// Context providers for state management across components
import { LiveMenuProvider } from './context/LiveMenuContext'; // Provides live menu data to child components
import { RestaurantsProvider } from './context/RestaurantsContext'; // Provides restaurant data to child components
import { TableLayoutProvider } from './context/TableLayoutContext'; // Provides table layout data
import { OrderProvider } from './context/OrderContext'; // Provides order-related context

// Importing User side components
import HomeDashboard from './pages/user/HomeDashboard'; // Home Dashboard for users
import LiveMenu from './pages/user/LiveMenu'; // Displays the live menu to users
import Tablebooking from './pages/user/Tablebooking'; // Allows users to book tables
import PreorderFood from './pages/user/PreorderFood'; // Allows users to preorder food

// Importing Restaurant side components
import AdminDashboard from './pages/restaurant/AdminDashboard'; // Admin Dashboard for restaurant side
import LiveMenuControl from './pages/restaurant/LiveMenuControl'; // Allows restaurant to control live menu
import Tablebookings from './pages/restaurant/Tablebookings'; // Handles table bookings for the restaurant
import CurrentOrder from './pages/restaurant/CurrentOrder'; // Displays current orders for the restaurant

// Importing icons for the landing page and dashboard
import { FaHome, FaUtensils, FaChair, FaConciergeBell } from 'react-icons/fa'; 
import { MdOutlineDashboardCustomize, MdOutlineRestaurantMenu, MdOutlineTableRestaurant } from 'react-icons/md';

// Landing Page Component (initial selection screen)
function LandingPage({ onSelect }) {
  const navigate = useNavigate(); // Hook to navigate between pages

  // Function to handle selection (either user side or restaurant side)
  const handleSelect = (side) => {
    onSelect(side); // Set the selected side (user or restaurant)
    navigate(side === 'user' ? '/user' : '/restaurant'); // Navigate to the appropriate page based on selection
  };

  return (
    <div className="landing-page" style={{ backgroundColor: '#f4f8d3' }}>
      <h1>Welcome to DineSync</h1>
      <p>Select your side</p>
      <div className="buttons-container">
        {/* Buttons to select user side or restaurant side */}
        <button className="btn" onClick={() => handleSelect('user')} style={{ backgroundColor: '#102e50', color: 'white' }}>User Side</button>
        <button className="btn" onClick={() => handleSelect('restaurant')} style={{ backgroundColor: '#102e50', color: 'white' }}>Restaurant Side</button>
      </div>
    </div>
  );
}

// User Dashboard Page (for users after login/selection)
function UserDashboard() {
  return (
    <div className="dashboard">
      <header className="header">DineSync - User Side</header>
      <div className="icon-grid">
        {/* Link to various user side features */}
        <Link to="/home" className="icon-card"><FaHome size={50} /><h4>Home</h4></Link>
        <Link to="/livemenu" className="icon-card"><FaUtensils size={50} /><h4>Live Menu</h4></Link>
        <Link to="/tablebooking" className="icon-card"><FaChair size={50} /><h4>Table Booking</h4></Link>
        <Link to="/preorder" className="icon-card"><FaConciergeBell size={50} /><h4>Preorder Food</h4></Link>
      </div>
    </div>
  );
}

// Restaurant Dashboard Page (for restaurant admins after login/selection)
function RestaurantDashboard() {
  return (
    <div className="dashboard">
      <header className="header">DineSync - Restaurant Side</header>
      <div className="icon-grid">
        {/* Link to various restaurant side features */}
        <Link to="/admindashboard" className="icon-card"><MdOutlineDashboardCustomize size={50} /><h4>Admin Dashboard</h4></Link>
        <Link to="/livemenucontrol" className="icon-card"><MdOutlineRestaurantMenu size={50} /><h4>Menu Control</h4></Link>
        <Link to="/tablebookings" className="icon-card"><FaChair size={50} /><h4>Table Bookings</h4></Link>
        <Link to="/currentorder" className="icon-card"><MdOutlineTableRestaurant size={50} /><h4>Current Order</h4></Link>
      </div>
    </div>
  );
}

// Main App component which manages routing and context providers
function App() {
  const [selectedSide, setSelectedSide] = useState(null); // State to keep track of the selected side (user or restaurant)

  return (
    <OrderProvider> {/* Wrap all components with OrderProvider to manage orders */}
      <RestaurantsProvider>
        <LiveMenuProvider>
          <TableLayoutProvider>
            <Router> {/* Router to handle all page routing */}
              <Routes>
                {/* Landing page where user selects either 'user' or 'restaurant' side */}
                <Route path="/" element={<LandingPage onSelect={setSelectedSide} />} />
                
                {/* Routes for user side */}
                <Route path="/user" element={<UserDashboard />} />
                <Route path="/home" element={<HomeDashboard />} />
                <Route path="/livemenu" element={<LiveMenu />} />
                <Route path="/tablebooking" element={<Tablebooking />} />
                <Route path="/preorder" element={<PreorderFood />} />
                
                {/* Routes for restaurant side */}
                <Route path="/restaurant" element={<RestaurantDashboard />} />
                <Route path="/admindashboard" element={<AdminDashboard />} />
                <Route path="/livemenucontrol" element={<LiveMenuControl />} />
                <Route path="/tablebookings" element={<Tablebookings />} />
                <Route path="/currentorder" element={<CurrentOrder />} />
              </Routes>
            </Router>
          </TableLayoutProvider>
        </LiveMenuProvider>
      </RestaurantsProvider>
    </OrderProvider>
  );
}

export default App; // Exporting the App component for use in the root file
