// import InputField from "../InputField/InputField";
import { Link, NavLink } from "react-router-dom";
import "./Header.scss";

export default function Header(props) {
  return (
    <header className="header">
      <h1 className="header__title">DogPool</h1>

      <div className="header__toggle">
        <span className="header__bar"></span>
        <span className="header__bar"></span>
        <span className="header__bar"></span>
      </div>
      <ul></ul>
    </header>
  );
}
