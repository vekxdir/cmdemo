import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./orderTracking.css";

const stages = ["Order Received", "Preparing", "Out for Delivery", "Delivered"];

const OrderTracking = ({ orders, setOrders }) => {
  const [searchParams] = useSearchParams();
  const orderId = parseInt(searchParams.get("orderId"));
  const order = orders.find((o) => o.id === orderId);

  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (!order) return;

    // find current stage
    const currentIndex = stages.indexOf(order.status);
    setCurrentStage(currentIndex);

    // auto update status every 3s until Delivered / Cancelled
    if (order.status !== "Delivered" && order.status !== "Cancelled") {
      const timer = setInterval(() => {
        setOrders((prev) =>
          prev.map((o) =>
            o.id === order.id
              ? {
                  ...o,
                  status:
                    stages[stages.indexOf(o.status) + 1] || "Delivered",
                }
              : o
          )
        );
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [order, order?.status, setOrders]);

  const handleCancelOrder = () => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === order.id ? { ...o, status: "Cancelled" } : o
      )
    );
  };

  if (!order) {
    return <h2>No order selected</h2>;
  }

  return (
    <div className="tracking-page">
      <h2>Order Tracking - #{order.id}</h2>

      {order.status === "Cancelled" && (
        <p className="cancel-msg">❌ Order has been cancelled.</p>
      )}

      <div className="tracking-container">
        {stages.map((stage, index) => (
          <div className="tracking-stage" key={index}>
            <div
              className={`circle ${
                index <= currentStage && order.status !== "Cancelled"
                  ? "active"
                  : ""
              }`}
            >
              {index + 1}
            </div>
            <p
              className={
                index <= currentStage && order.status !== "Cancelled"
                  ? "active"
                  : ""
              }
            >
              {stage}
            </p>
            {index < stages.length - 1 && (
              <div
                className={`line ${
                  index < currentStage && order.status !== "Cancelled"
                    ? "active"
                    : ""
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {order.status !== "Delivered" && order.status !== "Cancelled" && (
        <button className="cancel-btn" onClick={handleCancelOrder}>
          Cancel Order
        </button>
      )}
    </div>
  );
};

export default OrderTracking;
