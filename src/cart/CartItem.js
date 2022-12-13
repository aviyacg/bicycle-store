import Quantity from "./Quantity";

import "./CartItem.css";

function CartItem({ item, quantity, addItem, removeItem }) {
  const { name, image, price } = item;
  return (
    <div className="CartItem">
      <img src={image} alt={name} />
      <div className="medium">{name}</div>
      <div className="medium">{price}$</div>
      <Quantity
        quantity={quantity}
        addItem={() => addItem(item)}
        removeItem={() => removeItem(item)}
      />
    </div>
  );
}

export default CartItem;
