import "./LoginPage.scss";
import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/logo.jpg";

export default class LoginPage extends Component {
  state = {
    error: "",
    successLogin: false,
  };

  loginHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/login", {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((res) => {
        console.log("logged in");
        sessionStorage.setItem("token", res.data.token);
        this.setState({ successLogin: true });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: error.res.data });
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

          {this.state.error && (
            <div className="login__message">{this.state.error}</div>
          )}
          {this.state.successLogin && <Redirect to="/profile" />}
        </form>

        <Link className="login__signup" to="/signup">
          Sign Up
        </Link>
      </main>
    );
  }
}
