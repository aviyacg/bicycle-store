import Info from "../components/Info";
import ItemCard from "./ItemCard";

import moneyBike from "../assets/images/money-bike.jpg";
import successBike from "../assets/images/success-bike.jpg";
import deliveryBike from "../assets/images/delivery-bike.jpg";
import "./Shop.css";
import GoToCart from "../components/GoToCart";

function Shop({ itemList, itemCount, addItem }) {
  const itemCardList = itemList.map((item, index) => (
    <ItemCard key={index} item={item} addItem={addItem} />
  ));
  const infoList = [
    {
      title: "Successful pepole ride Bike!",
      image: successBike,
      text: "Bill Gates, Steve Jobs, Elon Musk and list goes on... Join them with your own new bike today",
    },
    {
      title: "Rich pepole ride Bike!",
      image: moneyBike,
      text: "save some gas cash and ride back home on your own new bike",
    },
    {
      title: "Delivery persons disscount!",
      image: deliveryBike,
      text: "To show our support we give 10% disscount to delivery persons",
    },
  ];
  return (
    <>
      <div className="Shop">
        <div className="gallery">{itemCardList}</div>
      </div>
      <Info infoList={infoList} />
      <GoToCart itemCount={itemCount} />
    </>
  );
}

export default Shop;
