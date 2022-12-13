import "./App.css";
import Header from "./header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Shop from "./shop/Shop";
import Cart from "./cart/Cart";

import blueBike from "./assets/images/blue-bike.jpg";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState({});

  const addItem = (item) => {
    const prevItem = cart[item.name];
    if (prevItem) {
      prevItem.quantity = prevItem.quantity + 1;
      setCart({ [item.name]: prevItem, ...cart });
      console.log("add 1 more item", item);
    } else {
      setCart({
        [item.name]: {
          item: { name: item.name, price: item.price },
          quantity: 1,
        },
        ...cart,
      });
      console.log("add new item", { item });
    }
  };

  const removeItem = (item) => {
    const prevItem = cart[item.name];
    if (prevItem) {
      prevItem.quantity = prevItem.quantity - 1;
      if (prevItem.quantity > 0) {
        setCart({ [item.name]: prevItem, ...cart });
      } else {
        const prevCart = cart;
        delete prevCart[item.name];
        setCart(prevCart);
      }
    }
  };

  const itemList = [
    {
      name: "Sky Blue Bike",
      image: blueBike,
      description:
        "This is a really good bike to purchase and you will also pay for our rent",
      price: 100,
    },
  ];

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/shop"
            element={<Shop itemList={itemList} addItem={addItem} />}
          />
          <Route
            path="/cart"
            element={
              <Cart cart={cart} addItem={addItem} removeItem={removeItem} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
