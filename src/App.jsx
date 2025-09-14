import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";

import Nav from "./components/navbar/nav";
import ImageSlider from "./components/home/home";
import FoodGallery1 from "./components/fooditem/food";
import DrinkGallery from "./components/fooditem/drink";
import MealPage from "./components/category/Meal";
import AllItemsPage1 from "./components/fooditem/AllItemsPage";
import Cart from "./components/cart/cart";
import Categories from "./components/category/categoryitem";
import About from "./components/About/about";
import Footer from "./components/footer/footer";
import OrderTracking from "./components/OrderTracking/OrderTracking";
import UserPage from "./components/UserPage/user";
import Login from "./components/login/login";
import Signup from "./components/login/Signup";
import AdminLogin from "./components/login/AdminLogin";
import AdminSignup from "./components/login/AdminSignup";
import AdminPanel from "./components/admin/AdminPanel";
import SearchPage from "./components/fooditem/search";

// ---------------------------
// Landing Modal
// ---------------------------
const LandingModal = ({ onChoose }) => {
  const navigate = useNavigate();

  const handleUser = () => {
    navigate("/login");
    onChoose("user");
  };

  const handleAdmin = () => {
    const adminExists = localStorage.getItem("adminUser");
    navigate(adminExists ? "/AdminLogin" : "/AdminSignup");
    onChoose("admin");
  };

  return (
    <div className="landing-modal">
      <h2>Welcome!</h2>
      <p>Choose your view:</p>
      <div className="landing-buttons">
        <button onClick={handleUser}>User Sign Up / Login</button>
        <button onClick={handleAdmin}>Admin Login / Signup</button>
      </div>
    </div>
  );
};

// ---------------------------
// Protected Routes
// ---------------------------
const ProtectedUserRoute = ({ user, children }) =>
  !user ? <Navigate to="/login" /> : children;

const ProtectedAdminRoute = ({ admin, children }) =>
  !admin ? <Navigate to="/AdminLogin" /> : children;

// ---------------------------
// Wrapper to handle Nav/Footer visibility
// ---------------------------
const AppContent = ({
  cartItems,
  setCartItems,
  user,
  setUser,
  admin,
  setAdmin,
  orders,
  setOrders,
  addToCart,
  removeFromCart,
  placeOrder,
}) => {
  const location = useLocation();
  const [showLandingModal, setShowLandingModal] = useState(true);

  const hideNavOn = ["/admin-panel"];
  const hideFooterOn = ["/login", "/signup", "/AdminLogin", "/AdminSignup", "/admin-panel"];
  const showNav = !hideNavOn.includes(location.pathname);
  const showFooter = !hideFooterOn.includes(location.pathname);

  const handleChoose = () => setShowLandingModal(false);

  return (
    <>
      {showNav && (
        <Nav cartItems={cartItems} user={user} setUser={setUser} admin={admin} setAdmin={setAdmin} />
      )}
      {showLandingModal && <LandingModal onChoose={handleChoose} />}
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <ProtectedUserRoute user={user}>
              <section className="slider-section">
                <ImageSlider />
                <Categories />
                <About />
              </section>
              {showFooter && <Footer />}
            </ProtectedUserRoute>
          }
        />

        {/* User Pages */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route
          path="/user"
          element={
            <ProtectedUserRoute user={user}>
              <UserPage cartItems={cartItems} orders={orders} user={user} />
              {showFooter && <Footer />}
            </ProtectedUserRoute>
          }
        />

        {/* Admin Pages */}
        <Route path="/AdminSignup" element={<AdminSignup setAdmin={setAdmin} />} />
        <Route path="/AdminLogin" element={<AdminLogin setAdmin={setAdmin} />} />
        <Route
          path="/admin-panel"
          element={
            <ProtectedAdminRoute admin={admin}>
              <AdminPanel />
            </ProtectedAdminRoute>
          }
        />

        {/* Food / Drink / Meal */}
        <Route
          path="/All-item"
          element={
            <ProtectedUserRoute user={user}>
              <AllItemsPage1 addToCart={addToCart} />
              {showFooter && <Footer />}
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/Meal"
          element={
            <ProtectedUserRoute user={user}>
              <MealPage addToCart={addToCart} />
              {showFooter && <Footer />}
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/food"
          element={
            <ProtectedUserRoute user={user}>
              <FoodGallery1 addToCart={addToCart} />
              {showFooter && <Footer />}
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/drink"
          element={
            <ProtectedUserRoute user={user}>
              <DrinkGallery addToCart={addToCart} />
              {showFooter && <Footer />}
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedUserRoute user={user}>
              <SearchPage addToCart={addToCart} />
              {showFooter && <Footer />}
            </ProtectedUserRoute>
          }
        />

        {/* Cart / Tracking */}
        <Route
          path="/cart"
          element={
            <ProtectedUserRoute user={user}>
              <Cart cartItems={cartItems} removeFromCart={removeFromCart} placeOrder={placeOrder} />
              {showFooter && <Footer />}
            </ProtectedUserRoute>
          }
        />
        <Route
        to="/tracking"
          path="/tracking"
          element={
            <ProtectedUserRoute user={user}>
              <OrderTracking orders={orders} setOrders={setOrders} />
              {showFooter && <Footer />}
            </ProtectedUserRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

// ---------------------------
// Main App
// ---------------------------
function App() {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(localStorage.getItem("isAdmin") === "true");

  // Cart functions
  const addToCart = (item) => {
    if (!user) return alert("Please log in to add items to cart.");
    const existing = cartItems.find((i) => i.id === item.id);
    if (existing) {
      setCartItems(cartItems.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i)));
    } else {
      setCartItems([...cartItems, { ...item, qty: 1 }]);
    }
  };
  const removeFromCart = (id) => setCartItems(cartItems.filter((i) => i.id !== id));
  const placeOrder = () => {
    if (!user) return alert("Please log in to place an order.");
    if (cartItems.length === 0) return alert("Cart is empty!");
    const newOrder = {
      id: Date.now(),
      items: cartItems.map((i) => i.title),
      total: cartItems.reduce((sum, i) => sum + parseInt(i.price.replace("₹", "")) * (i.qty || 1), 0),
      status: "Order Received",
    };
    setOrders([...orders, newOrder]);
    setCartItems([]);
    alert("✅ Order placed successfully!");
  };

  return (
    <Router>
      <AppContent
        cartItems={cartItems}
        setCartItems={setCartItems}
        user={user}
        setUser={setUser}
        admin={admin}
        setAdmin={setAdmin}
        orders={orders}
        setOrders={setOrders}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        placeOrder={placeOrder}
      />
    </Router>
  );
}

export default App;
