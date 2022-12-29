import "./App.css";

import Header from "./header/Header";
import Home from "./home/Home";
import Shop from "./shop/Shop";
import Cart from "./cart/Cart";
import Login from "./login/Login";

import blueBike from "./assets/images/blue-bike.jpg";
import redBike from "./assets/images/red-bike.jpg";
import greenBike from "./assets/images/green-bike.jpg";
import purpleBike from "./assets/images/purple-bike.jpg";
import orangeBike from "./assets/images/orange-bike.jpg";
import turquoiseBike from "./assets/images/turquoise-bike.jpg";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  addItemToCart,
  getCart,
  removeItemFromCart,
} from "./firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/auth";

function App() {
  const [cart, setCart] = useState({});
  const [user] = useAuthState(auth);

  // load cart from DB
  const loadDBcart = async () => {
    const dbCart = await getCart();
    setCart(dbCart);
  };
  useEffect(() => {
    loadDBcart();
  }, [user]);

  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const count = Object.keys(cart).reduce((sum, name) => {
      const quantity = cart[name].quantity;
      return sum + quantity;
    }, 0);
    setItemCount(count);
  }, [cart]);

  const addItem = (item) => {
    const prevItem = cart[item.name];
    if (prevItem) {
      prevItem.quantity = prevItem.quantity + 1;
      setCart({ [item.name]: prevItem, ...cart });
    } else {
      setCart({
        [item.name]: {
          item,
          quantity: 1,
        },
        ...cart,
      });
    }
    addItemToCart(item);
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
        setCart({ ...prevCart });
      }
    }
    removeItemFromCart(item);
  };

  const itemList = [
    {
      name: "Blue Bike",
      image: blueBike,
      description:
        "This is a really good bike to purchase and you will also pay for our rent",
      price: 100,
    },
    {
      name: "Red Bike",
      image: redBike,
      description:
        "This is a really good bike to purchase and you will also pay for our rent",
      price: 100,
    },
    {
      name: "Green Bike",
      image: greenBike,
      description:
        "This is a really good bike to purchase and you will also pay for our rent",
      price: 100,
    },
    {
      name: "Purple Bike",
      image: purpleBike,
      description:
        "This is a really good bike to purchase and you will also pay for our rent",
      price: 100,
    },
    {
      name: "Orange Bike",
      image: orangeBike,
      description:
        "This is a really good bike to purchase and you will also pay for our rent",
      price: 100,
    },
    {
      name: "Turquoise Bike",
      image: turquoiseBike,
      description:
        "This is a really good bike to purchase and you will also pay for our rent",
      price: 100,
    },
  ];

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Login />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/shop"
            element={
              <Shop
                itemList={itemList}
                itemCount={itemCount}
                addItem={addItem}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart cart={cart} addItem={addItem} removeItem={removeItem} />
            }
          />
        </Routes>
      </BrowserRouter>
      <footer>
        <a href="https://www.freepik.com/free-vector/various-models-styles-bikes-riders-choose-from-according-age-usage-vector-cartoon-illustration-bicycle-isolated-white-background_24023071.htm#&position=4&from_view=collections">
          Images by jcomp
        </a>{" "}
        on Freepik
      </footer>
    </div>
  );
}

export default App;
