import { Link } from "react-router-dom";
import "./GoToCart.css";

function GoToCart({ itemCount }) {
  return (
    <div className="GoToCart small">
      <Link className="small" to="/cart">
        Your Cart {`(${itemCount})`}
      </Link>
    </div>
  );
}

export default GoToCart;
