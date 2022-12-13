import "./InfoCard.css";

function InfoCard({ title, image, text }) {
  return (
    <div className="InfoCard">
      <div className="medium">{title}</div>
      <img src={image} alt={title} />
      <div className="small">{text}</div>
    </div>
  );
}

export default InfoCard;
