import "./InfoCard.css";

function InfoCard({ info }) {
  const { title, image, text } = info;
  return (
    <div className="InfoCard">
      <div className="medium">{title}</div>
      <img src={image} alt={title} />
      <div className="small">{text}</div>
    </div>
  );
}

export default InfoCard;
