import Welcome from "./Welcome";
import Info from "../components/Info";

import moneyBike from "../assets/images/money-bike.jpg";

function Home() {
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
    <div className="Home">
      <Welcome />
      <Info infoList={infoList} />
    </div>
  );
}

export default Home;
