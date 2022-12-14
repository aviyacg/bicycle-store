import "./ItemCard.css";

function ItemCard({ item, addItem }) {
  const { name, image, description, price } = item;
  return (
    <div className="ItemCard">
      <div className="medium">{name}</div>
      <img src={image} alt={name} />
      <div className="small">{description}</div>
      <div className="bottom">
        <div className="small">{price}$</div>
        <button
          className="small"
          onClick={(event) => {
            addItem(item);
            event.target.classList.add("add-item");
            event.target.textContent = "item added";
            window.setTimeout(() => {
              event.target.classList.remove("add-item");
              event.target.textContent = "add to cart";
            }, 800);
          }}
        >
          add to cart
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
