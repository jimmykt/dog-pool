import "./SignUpPage.scss";
import { Component } from "react";
import { API_URL } from "../../App";

import axios from "axios";
import Header from "../../components/Header/Header";
import SignUpInput from "../../components/SignUpInput/SignUpInput";

export default class SignUpPage extends Component {
  state = {
    error: "",
    success: false,
    failedAuth: false,

    user: {
      first_name: null,
      last_name: null,
      email: null,
      password: null,
      phone_number: null,
      address: null,
      city: null,
    },
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // register user
    axios
      .post(API_URL + "/register/user", {
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        phone_number: e.target.phone_number.value,
        address: e.target.address.value,
        city: e.target.city.value,
      })
      .then((res) => {
        this.setState({ success: true, error: "" });
        axios
          .get(API_URL + "/register/getid/" + e.target.email.value)
          .then((res) => {
            const id = res.data.data.id;
            this.props.history.push("/register-dog/" + id);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ success: false, error: error.response.data });
      });
  };

  isUser = () => {
    if (
      this.state.user.first_name ||
      this.state.user.last_name ||
      this.state.user.email ||
      this.state.user.password ||
      this.state.user.phone_number ||
      this.state.user.address ||
      this.state.user.city
    ) {
      console.log(this.state.user.city);
      return true;
    }
    console.log("here");
    return false;
  };

  onChange = (e) => {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [e.target.id]: e.target.value,
      },
    }));
    console.log(this.state.user);
  };

  render() {
    return (
      <main className="SignUpPage">
        <Header />
        <form onSubmit={this.handleSubmit}>
          <SignUpInput
            placeholder="First Name"
            type="text"
            id="first_name"
            onChange={this.onChange}
          />
          <SignUpInput
            placeholder="Last Name"
            type="text"
            id="last_name"
            onChange={this.onChange}
          />
          <SignUpInput
            placeholder="Email"
            type="text"
            id="email"
            onChange={this.onChange}
          />
          <SignUpInput
            placeholder="Password"
            type="password"
            id="password"
            onChange={this.onChange}
          />
          <SignUpInput
            placeholder="Confirm Password"
            type="password"
            id="confirm_password"
          />
          <SignUpInput
            placeholder="Phone Number"
            type="text"
            id="phone_number"
            onChange={this.onChange}
          />
          <SignUpInput
            placeholder="Address"
            type="text"
            id="address"
            onChange={this.onChange}
          />
          <SignUpInput
            placeholder="City"
            type="text"
            id="city"
            onChange={this.onChange}
          />
          <button className="SignUpPage__button">Next</button>
        </form>
      </main>
    );
  }
}
