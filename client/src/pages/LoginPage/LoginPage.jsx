import "./LoginPage.scss";
import { Component } from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/logo.jpg";

export default class LoginPage extends Component {
  render() {
    return (
      <main className="login">
        <img className="login__logo" src={Logo} alt="man walking two dogs" />

        <form className="login__form">
          <input
            className="login__username"
            type="text"
            name="email"
            id="email"
            placeholder="email"
          />
          <input
            className="login__password"
            type="password"
            name="passowrd"
            id="password"
            placeholder="password"
          />
          <button className="login__login-button">Login</button>
        </form>

        <Link className="login__signup" to="/signup">
          Sign Up
        </Link>
      </main>
    );
  }
}
