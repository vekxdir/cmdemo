import React, { useState } from "react";
import "./admin.css";

function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={activeTab === "orders" ? "active" : ""}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </li>
          <li
            className={activeTab === "users" ? "active" : ""}
            onClick={() => setActiveTab("users")}
          >
            Users
          </li>
          <li
            className={activeTab === "items" ? "active" : ""}
            onClick={() => setActiveTab("items")}
          >
            Items
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {activeTab === "dashboard" && (
          <div>
            <h1>Dashboard</h1>
            <p>Welcome, Admin! Here is your overview.</p>
          </div>
        )}
        {activeTab === "orders" && (
          <div>
            <h1>Orders</h1>
            <p>Manage all orders here.</p>
          </div>
        )}
        {activeTab === "users" && (
          <div>
            <h1>Users</h1>
            <p>View and manage registered users.</p>
          </div>
        )}
        {activeTab === "items" && (
          <div>
            <h1>Items</h1>
            <p>Add, edit, or remove food items.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminPanel;
