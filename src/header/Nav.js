import CustomLink from "./CustomLink";

function Nav() {
  return (
    <nav className="navBar">
      <CustomLink to="/">Home</CustomLink>
      <CustomLink to="/shop">Shop</CustomLink>
      <CustomLink to="/cart">Cart</CustomLink>
    </nav>
  );
}

export default Nav;
