import React, { useState, useEffect } from "react";
import "./food.css";

// Import all items
// import PizzaImg from '../../assets/pizza.jpeg';
// import BurgerImg from '../../assets/burger.jpeg';
// import ColdDrinkImg from '../../assets/colddrink.webp';
// import CoffeeImg from '../../assets/drink.webp';
// import VegSalad from '../../assets/veg_salad.webp';
// import ChickenSalad from '../../assets/chicken_salad.webp';
// import PastaMeal from '../../assets/pasta_meal.webp';

const ALL_ITEMS = [
  { id: 1, title: "Margherita Pizza", price: "₹299"  },
  { id: 2, title: "Cheese Burger", price: "₹199"},
  { id: 3, title: "Cold Drink", price: "₹50" },
  { id: 4, title: "Coffee", price: "₹80" },
  { id: 5, title: "Veg Salad", price: "₹120"},
  { id: 6, title: "Chicken Salad", price: "₹150" },
  { id: 7, title: "Pasta Meal", price: "₹180"},
];

function AllItemsPage1({ addToCart }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(ALL_ITEMS);
  }, []);

  return (
    <div className="food-page">
      <h2>All Items</h2>
      <div className="food-grid">
        {items.map((item, idx) => (
          <div key={item.id} className="food-card" style={{ "--delay": `${idx * 0.1}s` }} onClick={() => addToCart(item)}>
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllItemsPage1;
