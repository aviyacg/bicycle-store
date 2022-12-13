import ItemCard from "./ItemCard";

import "./Shop.css";

function Shop({ itemList, addItem }) {
  const itemCardList = itemList.map((item, index) => (
    <ItemCard key={index} item={item} addItem={addItem} />
  ));
  return (
    <div className="Shop">
      <div className="gallery">{itemCardList}</div>
    </div>
  );
}

export default Shop;
