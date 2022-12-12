import Nav from "./Nav";
import "./Header.css";

function Header() {
  return (
    <div className="Header">
      <header className="logo">
        <h1 className="bigger text-shadow">Bicycle</h1>
        <h2 className="big text-shadow">Bike your way through the world</h2>
      </header>
      <Nav />
    </div>
  );
}

export default Header;
