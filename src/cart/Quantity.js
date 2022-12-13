import "./Quantity.css";

function Quantity({ quantity, addItem, removeItem }) {
  return (
    <div className="Quantity">
      <button class="medium" onClick={removeItem}>
        -
      </button>
      <div class="medium">{quantity}</div>
      <button class="medium" onClick={addItem}>
        +
      </button>
    </div>
  );
}

export default Quantity;
