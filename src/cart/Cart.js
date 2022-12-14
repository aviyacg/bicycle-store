import CartItem from "./CartItem";
import Info from "../components/Info";

import moneyBike from "../assets/images/money-bike.jpg";
import "./Cart.css";

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
      title: "Get a bike today!",
      image: moneyBike,
      text: "save some cash and ride back home",
    },
    {
      title: "Get a bike today!",
      image: moneyBike,
      text: "save some cash and ride back home",
    },
    {
      title: "Get a bike today!",
      image: moneyBike,
      text: "save some cash and ride back home",
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
    </>
  );
}

export default Cart;
