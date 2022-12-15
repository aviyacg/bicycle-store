import { Link } from "react-router-dom";
import "./GoShopping.css";

function GoShopping({ text }) {
  return (
    <div className="GoShopping small">
      <Link className="small" to="/shop">
        {text ? text : "Go Shopping"}
      </Link>
    </div>
  );
}

export default GoShopping;
