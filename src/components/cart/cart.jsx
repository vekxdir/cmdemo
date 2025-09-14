import React, { useState } from "react";
import './cart.css';
import { useNavigate } from "react-router-dom";

function Cart({ cartItems }) {
  const navigate =useNavigate();
  const [orderStatus, setOrderStatus] = useState(""); // "" | "processing" | "success"
  const [mobile, setMobile] = useState(""); // store user's mobile number

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (parseInt(item.price.replace('₹','')) * (item.qty || 1)),
    0
  );

  const handleOrder = () => {
    if(cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if(!mobile) {
      alert("Please enter your mobile number!");
      return;
    }

    setOrderStatus("processing"); // show waiting message

    // Simulate order processing delay (3 seconds)
    setTimeout(() => {
      setOrderStatus("success");
      // Here you could send data to backend/admin
      console.log("Order sent to admin:", { cartItems, totalPrice, mobile });
    }, 3000);
  };
   const goToTracking = () => {
    navigate("/tracking"); // navigate to tracking page
  };

  return (
    <div className="cart-page">
      <h2>My Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.img} alt={item.title} className="cart-img" />
              <div className="cart-info">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <p className="price">{item.price} x {item.qty || 1}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-total">
        <h3>Total: ₹{totalPrice}</h3>
      </div>

      {/* Mobile input */}
      <div className="mobile-input">
        <label htmlFor="mobile">Mobile Number:</label>
        <input
          type="tel"
          id="mobile"
          placeholder="Enter your mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>

      <button
        className="order-btn"
        onClick={handleOrder}
        disabled={orderStatus === "processing"}
      >
        {orderStatus === "processing" || mobile.length !== 10 ? "Processing..." : "Place Order"}
      </button>

        {orderStatus === "success" && (
        <div className="tracking-section">
          <p className="success-msg">
            ✅ Order placed successfully! Admin will contact you at {mobile}.
          </p>
          <button className="tracking-btn" onClick={goToTracking}>
            View Order Tracking
          </button>
        </div>
       
      )}
    </div>
  );
}

export default Cart;
