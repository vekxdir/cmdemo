import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css";

function Nav({ cartItems, user, setUser }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to search items!");
      return;
    }
    if (searchTerm.trim() === "") return;
    navigate("/search", { state: { query: searchTerm } });
    setSearchTerm("");
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="navbar-top">
        <div className="top-left">
          <div className="logo">FusionXCanteen</div>
        </div>

        <div className="top-center">
          <ul className="nav-links">
            <li><Link to="/">🏠 Home</Link></li>
            <li>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">🔍</button>
              </form>
            </li>
            <li><Link to="/tracking">🚚 Tracker</Link></li>
            <li>
              {user ? <Link to="/user">👤 User</Link> : <Link to="/login">👤 Login</Link>}
            </li>
          </ul>
        </div>

        <div className="top-right">
          {user && (
            <button onClick={handleLogout} className="logout-btn">🔒</button>
          )}
          <Link to="/cart" className="cart-btn">
            <i className="fas fa-shopping-cart"></i> ({cartItems.length})
          </Link>
        </div>
      </nav>

      {/* Bottom Navbar for Mobile */}
      <ul className="navbar-bottom">
        <li><Link to="/">🏠</Link></li>
        <li><Link to="/search">🔍</Link></li>
        <li><Link to="/tracking">🚚</Link></li>
        <li>{user ? <Link to="/user">👤</Link> : <Link to="/login">👤</Link>}</li>
      </ul>
    </>
  );
}

export default Nav;
