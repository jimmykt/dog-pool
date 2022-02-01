import "./SignUpPage.scss";
import { Component } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import SignUpInput from "../../components/SignUpInput/SignUpInput";

export default class SignUpPage extends Component {
  state = {
    error: "",
    success: false,

    user: null,
    failedAuth: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // register user
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
      .then((res) => {
        this.setState({ success: true, error: "" });

        axios
          .get("http://localhost:8080/getid/" + e.target.email.value)
          .then((res) => {
            const id = res.data.data.id;
            this.props.history.push("/add-dog/" + id);
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

  render() {
    return (
      <main className="SignUpPage">
        <Header />
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
