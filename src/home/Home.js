import Welcome from "./Welcome";
import Info from "../components/Info";

import healthBike from "../assets/images/health-bike.jpg";
import musicBike from "../assets/images/music-bike.jpg";
import nasaBike from "../assets/images/nasa-bike.jpg";

function Home() {
  const infoList = [
    {
      title: "Eat your vegies!",
      image: healthBike,
      text: "Researchs approves that riding a bicycle every day will make you more healthy",
    },
    {
      title: "Get inspiration!",
      image: musicBike,
      text: "Ride bicycle to increase your creativity",
    },
    {
      title: "We work with NASA!",
      image: nasaBike,
      text: "Spacewalk is so 20th century, how about a Space bike?",
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
