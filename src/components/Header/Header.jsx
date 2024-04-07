import "./Header.css";
import logo from "../../assets/icons/logo.png";

function Header() {
  return (
    <header className="header">
      <h1 className="header-title">
        <img src={logo} alt="Logo" className="logo" /> iWeather
      </h1>
      <h3>
        Welcome to <span>TypeWeather</span>
      </h3>
      <p>Choose a location to see the weather forecast</p>
    </header>
  );
}

export default Header;
