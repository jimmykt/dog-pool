import "./SignUpDogPage.scss";
import { Component } from "react";
import axios from "axios";

import SignUpInput from "../../components/SignUpInput/SignUpInput";

export default class SignUpPage extends Component {
  state = {
    error: "",
    success: false,
    date: new Date(),

    file: null,
    fileName: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/register/dog", {
        dog_name: e.target.dog_name.value,
        birthday: e.target.birthday.value,
        dog_info: e.target.dog_info.value,
        owner_id: this.props.match.params.id,
        photo_name: this.state.fileName,
        photo_file: this.state.file,
      })
      .then(() => {
        this.setState({ success: true, error: "" });
        this.props.history.push("/login");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ success: false, error: error.response.data });
      });
  };

  render() {
    return (
      <main className="SignUpDogPage">
        <form onSubmit={this.handleSubmit}>
          <p className="SignUpDogPage__upload-text">
            Upload a Photo of you Dog
          </p>

          <input
            className="SignUpDogPage__upload-button"
            type="file"
            name="photo"
            id="photo"
            onChange={this.saveFile}
          />

          <SignUpInput placeholder="Dog Name" type="text" id="dog_name" />

          <label className="SignUpDogPage__birthday-label" id="birthday">
            Birthday:{" "}
          </label>
          <input
            className="SignUpDogPage__birthday-input"
            type="date"
            id="birthday"
            name="birthday"
          />

          <textarea
            className="SignUpPage__dog-info"
            name="dogInfo"
            id="dog_info"
            rows="5"
            placeholder="Dogs information"
          ></textarea>

          <button className="SignUpPage__button">Sign Up</button>
        </form>
      </main>
    );
  }
}
