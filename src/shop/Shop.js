import Info from "../components/Info";
import ItemCard from "./ItemCard";

import moneyBike from "../assets/images/money-bike.jpg";
import "./Shop.css";

function Shop({ itemList, addItem }) {
  const itemCardList = itemList.map((item, index) => (
    <ItemCard key={index} item={item} addItem={addItem} />
  ));
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
      <div className="Shop">
        <div className="gallery">{itemCardList}</div>
      </div>
      <Info infoList={infoList} />
    </>
  );
}

export default Shop;
