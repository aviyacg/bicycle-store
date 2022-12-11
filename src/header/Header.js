import CustomLink from "./CustomLink";

function Header() {
  return (
    <div className="Header">
      <header className="logo">
        <h1>Bicycle</h1>
        <h2>Bike your way through hte world</h2>
      </header>
      <nav className="navBar">
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/shop">Shop</CustomLink>
        <CustomLink to="/cart">Cart</CustomLink>
      </nav>
    </div>
  );
}

export default Header;
