import "./Quantity.css";

function Quantity({ quantity, addItem, removeItem }) {
  return (
    <div className="Quantity">
      <button className="medium" onClick={removeItem}>
        -
      </button>
      <div className="medium">{quantity}</div>
      <button className="medium" onClick={addItem}>
        +
      </button>
    </div>
  );
}

export default Quantity;
