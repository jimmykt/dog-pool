import "./ProfilePage.scss";
import { Component } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../App";
import axios from "axios";

import Header from "../../components/Header/Header";

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

  addDogToPool = () => {
    const { owner_id, dog_name, photo, id, dog_info } = this.state.dog;
    const { first_name, last_name, email, phone_number, address, city } =
      this.state.user;

    const dogToPool = {
      owner_id,
      dog_id: id,
      dog_name,
      photo,
      first_name,
      last_name,
      email,
      phone_number,
      address,
      city,
      dog_info,
    };

    axios
      .post(API_URL + "/pool", dogToPool)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  removeFromPool = () => {
    axios
      .delete(API_URL + "/pool/" + this.state.dog.id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
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
      <>
        <Header />
        <main className="profile">
          <div className="profile__welcome">
            <h1 className="profile__welcome">Welcome back, {first_name} </h1>
          </div>
          <img className="profile__dog-photo" src={photo} alt="dog" />
          {/* <p className="profile__text profile__text--margin-bottom">
            {dog_info}
          </p> */}
          <div className="profile__status">
            <div className="profile__buttons-container">
              <p className="profile__text">
                Do you need {dog_name} walked today?
              </p>
              <Link to="/">
                <button
                  className="profile__poolmydog-button"
                  onClick={this.addDogToPool}
                >
                  Pool Me
                </button>
              </Link>

              <button
                className="profile__remove-pool"
                onClick={this.removeFromPool}
              >
                remove
              </button>
            </div>
          </div>

          <Link to="/login">
            <button className="profile__logout" onClick={this.handleLogout}>
              Log out
            </button>
          </Link>
        </main>
      </>
    );
  }
}

export default ProfilePage;
