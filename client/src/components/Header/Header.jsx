// import InputField from "../InputField/InputField";
import { Link, NavLink } from "react-router-dom";
import "./Header.scss";

export default function Header(props) {
  console.log(props);
  return (
    <header className="header">
      <h1 className="header__title">DogPool</h1>
      <ul></ul>
    </header>
  );
}
