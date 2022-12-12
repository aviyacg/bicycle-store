import CustomLink from "./CustomLink";

import "./Nav.css";

function Nav() {
  return (
    <nav className="Nav">
      <CustomLink to="/">Home</CustomLink>
      <CustomLink to="/shop">Shop</CustomLink>
      <CustomLink to="/cart">Cart</CustomLink>
    </nav>
  );
}

export default Nav;
