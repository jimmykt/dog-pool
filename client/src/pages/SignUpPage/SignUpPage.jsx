import "./SignUpPage.scss";
import { Component } from "react";
import { Link } from "react-router-dom";

import SignUpInput from "../../components/SignUpInput/SignUpInput";

export default class SignUpPage extends Component {
  render() {
    return (
      <main className="SignUpPage">
        <form>
          <SignUpInput placeholder="First Name" tpye="text" id="firstName" />
          <SignUpInput placeholder="Last Name" tpye="text" id="lastName" />
          <SignUpInput placeholder="Email" tpye="text" id="email" />
          <SignUpInput placeholder="Phone Number" tpye="text" id="email" />
          <SignUpInput placeholder="Dog Name" tpye="text" id="petName" />
          <textarea
            className="SignUpPage__dog-info"
            name="dogInfo"
            id="dogInfo"
            rows="5"
            placeholder="Dogs information"
          ></textarea>
          <Link to="/profile">
            <button className="SignUpPage__button">Sign Up</button>
          </Link>
        </form>
      </main>
    );
  }
}
