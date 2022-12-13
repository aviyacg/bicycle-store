import InfoCard from "./InfoCard";
import "./Info.css";

function Info({ infoList }) {
  const infoCardList = infoList.map((info, index) => (
    <InfoCard key={index} info={info} />
  ));
  return <div className="Info">{infoCardList}</div>;
}

export default Info;
