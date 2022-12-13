import "./App.css";
import Header from "./header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Shop from "./shop/Shop";
import Cart from "./cart/Cart";

import blueBike from "./assets/images/blue-bike.jpg";

function App() {
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
          <Route path="/shop" element={<Shop itemList={itemList} />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
