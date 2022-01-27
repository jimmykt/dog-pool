import "./SignUpPage.scss";
import { Component } from "react";
import axios from "axios";

import SignUpInput from "../../components/SignUpInput/SignUpInput";

export default class SignUpPage extends Component {
  state = {
    error: "",
    success: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/register/user", {
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        phone_number: e.target.phone_number.value,
        address: e.target.address.value,
        city: e.target.city.value,
      })
      .then(() => {
        this.setState({ success: true, error: "" });
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        this.setState({ success: false, error: error.response.data });
      });
  };

  render() {
    return (
      <main className="SignUpPage">
        <form onSubmit={this.handleSubmit}>
          <SignUpInput placeholder="First Name" type="text" id="first_name" />
          <SignUpInput placeholder="Last Name" type="text" id="last_name" />
          <SignUpInput placeholder="Email" type="text" id="email" />
          <SignUpInput placeholder="Password" type="password" id="password" />

          <SignUpInput
            placeholder="Confirm Password"
            type="password"
            id="confirm_password"
          />

          <SignUpInput
            placeholder="Phone Number"
            type="text"
            id="phone_number"
          />

          <SignUpInput placeholder="Address" type="text" id="address" />
          <SignUpInput placeholder="City" type="text" id="city" />

          <button className="SignUpPage__button">Next</button>
        </form>
      </main>
    );
  }
}
