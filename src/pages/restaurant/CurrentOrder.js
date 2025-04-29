import React from 'react';
import { useOrder } from '../../context/OrderContext';
import '../../styles/restaurant/CurrentOrder.css';

function CurrentOrder() {
  // Access orders from the Order context
  const { orders } = useOrder();

  return (
    <div className="current-order-container">
      <h2>Current Orders</h2>

      {/* Show message if no orders exist */}
      {orders.length === 0 ? (
        <p>No orders yet!</p>
      ) : (
        // Map through each order and display details
        orders.map((order, index) => (
          <div key={index} className="order">
            <h3>Order from {order.userName}</h3>
            <p>Restaurant: {order.restaurantName}</p>
            <p>Arrival Time: {order.arrivalTime}</p>
            <p>Times Reached: {order.timesReached}</p>

            <div>
              <h4>Ordered Dishes:</h4>
              {/* List all dishes for this order */}
              {order.dishes.map((dish, idx) => (
                <p key={idx}>{dish.name} (x{dish.quantity})</p>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CurrentOrder;
