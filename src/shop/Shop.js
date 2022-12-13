import ItemCard from "./ItemCard";

import "./Shop.css";

function Shop({ itemList }) {
  const itemCardList = itemList.map((item, index) => (
    <ItemCard key={index} item={item} />
  ));
  return (
    <div className="Shop">
      <div className="gallery">{itemCardList}</div>
    </div>
  );
}

export default Shop;
