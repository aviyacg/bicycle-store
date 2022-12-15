import CartItem from "./CartItem";
import Info from "../components/Info";

import surfBike from "../assets/images/surf-bike.jpg";
import candyBike from "../assets/images/candy-bike.jpg";
import gayBike from "../assets/images/gay-bike.jpg";
import "./Cart.css";
import GoShopping from "../components/GoShopping";

function Cart({ cart, addItem, removeItem }) {
  const itemList = Object.keys(cart)
    .sort()
    .map((name) => (
      <CartItem
        key={name}
        item={cart[name].item}
        quantity={cart[name].quantity}
        addItem={addItem}
        removeItem={removeItem}
      />
    ));

  const total = Object.keys(cart).reduce((sum, name) => {
    const itemPrice = cart[name].item.price;
    const quantity = cart[name].quantity;
    return sum + itemPrice * quantity;
  }, 0);

  const infoList = [
    {
      title: "Your kid is sugar hyped?",
      image: candyBike,
      text: "just get them a bike to blow off some steam",
    },
    {
      title: "Ride your Bike with pride!",
      image: gayBike,
      text: "We support LGBTQ as well as straight people",
    },
    {
      title: "Still thinking? go surffing!",
      image: surfBike,
      text: "It's a sunny day somewhere on the planet",
    },
  ];

  return (
    <>
      <div className="Cart">
        <div className="CartTable">
          {itemList.length > 0 ? (
            itemList
          ) : (
            <div className="medium empty-cart-messenger">
              your cart is empty
            </div>
          )}
          <div className="Total">
            <div className="medium">Total:</div>
            <div className="medium">{total}$</div>
          </div>
        </div>
      </div>
      <Info infoList={infoList} />
      <GoShopping text="Back to shop" />
    </>
  );
}

export default Cart;
