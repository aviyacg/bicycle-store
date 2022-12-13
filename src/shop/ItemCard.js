import "./ItemCard.css";

function ItemCard({ item }) {
  const { name, image, description, price } = item;
  return (
    <div className="ItemCard">
      <div className="medium">{name}</div>
      <img src={image} alt={name} />
      <div className="small">{description}</div>
      <div className="bottom">
        <div className="small">{price}$</div>
        <button className="small">add to cart</button>
      </div>
    </div>
  );
}

export default ItemCard;
