import "./SignUpDogPage.scss";
import { Component } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import SignUpInput from "../../components/SignUpInput/SignUpInput";

export default class SignUpPage extends Component {
  state = {
    error: "",
    success: false,
    date: new Date(),

    photo_file: null,
  };

  saveFile = (e) => {
    this.setState({
      photo_file: e.target.files[0],
    });
    console.log(e.target.files[0]);
    console.log(this.state.photo_file);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    axios
      .post("http://localhost:8080/register/dog", {
        dog_name: e.target.dog_name.value,
        birthday: e.target.birthday.value,
        dog_info: e.target.dog_info.value,
        owner_id: this.props.match.params.id,
        photo_file: this.state.photo_file,
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
        <Header />
        <form className="SignUpDogPage__form" onSubmit={this.handleSubmit}>
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
