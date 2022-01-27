import "./SignUpDogPage.scss";
import { Component } from "react";
import axios from "axios";

import SignUpInput from "../../components/SignUpInput/SignUpInput";

export default class SignUpPage extends Component {
  state = {
    error: "",
    success: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8080/register", {
        first_name: event.target.first_name.value,
        last_name: event.target.last_name.value,
        email: event.target.email.value,
        password: event.target.password.value,
        phone_number: event.target.phone_number.value,
        address: event.target.address.value,
        city: event.target.city.value,
      })
      .then(() => {
        this.setState({ success: true, error: "" });
        event.target.reset();
      })
      .catch((error) => {
        this.setState({ success: false, error: error.response.data });
      });
  };

  render() {
    return (
      <main className="SignUpPage">
        <form onSubmit={this.handleSubmit}>
          <SignUpInput placeholder="Dog Name" type="text" id="dog_name" />
          <textarea
            className="SignUpPage__dog-info"
            name="dogInfo"
            id="dog_info"
            rows="5"
            placeholder="Dogs information"
          ></textarea>
          {/* <Link to="/profile"> */}
          <button className="SignUpPage__button">Sign Up</button>
          {/* </Link> */}
        </form>
      </main>
    );
  }
}
