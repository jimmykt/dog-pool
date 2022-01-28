import "./LoginPage.scss";
import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/logo.jpg";

export default class LoginPage extends Component {
  loginHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/login", {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        this.setState({ success: true });
      })
      .catch((error) => {
        this.setState({ error: error.response.data });
      });
  };

  render() {
    return (
      <main className="login">
        <img className="login__logo" src={Logo} alt="man walking two dogs" />

        <form className="login__form" onSubmit={this.loginHandler}>
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
