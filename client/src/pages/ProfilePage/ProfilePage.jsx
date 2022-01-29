import { API_URL } from "../../App";
import "./ProfilePage.scss";
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class ProfilePage extends Component {
  state = {
    user: null,
    dog: null,
    failedAuth: false,
  };

  componentDidMount() {
    const token = sessionStorage.getItem("token");

    if (!token) {
      this.setState({ failedAuth: true });
      return;
    }

    axios
      .get(API_URL + "/current", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })

      .then((res) => {
        this.setState({
          user: res.data.user,
          dog: res.data.dog,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          failedAuth: true,
        });
      });
  }

  handleLogout = () => {
    sessionStorage.removeItem("token");
    this.setState({
      user: null,
      failedAuth: true,
    });
  };

  render() {
    if (this.state.failedAuth) {
      return (
        <main className="profile">
          <p>
            You must be logged in to see this page.{" "}
            <Link to="/login">Log in</Link>
          </p>
        </main>
      );
    }

    if (!this.state.user || !this.state.dog) {
      return (
        <main className="profile">
          <p>Loading...</p>
        </main>
      );
    }

    const { first_name } = this.state.user;
    const { dog_name, birthday, dog_info, photo } = this.state.dog;

    return (
      <main className="profile">
        <div className="profile__welcome">
          <h1 className="">Welcome back, {first_name} </h1>
        </div>

        <div className="profile__dog">
          <p>Dog Name: {dog_name}</p>
          <p>{dog_info}</p>
          <img src={photo} alt="dog" />
        </div>

        <div className="profile__status">
          <p>Do you need your dog walked today?</p>
          <button>I need a Pool</button>
        </div>

        <button className="profile__logout" onClick={this.handleLogout}>
          Log out
        </button>
      </main>
    );
  }
}

export default ProfilePage;
