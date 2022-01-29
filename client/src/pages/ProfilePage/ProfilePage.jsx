import { API_URL } from "../../App";
import "./ProfilePage.scss";
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
    //console.log(this.state.dog);
    //console.log(this.state.user);
    const { owner_id, dog_name, photo } = this.state.dog;
    const { first_name, last_name, email, phone_number, address, city } =
      this.state.user;

    const dogToPool = {
      owner_id,
      dog_name,
      photo,
      first_name,
      last_name,
      email,
      phone_number,
      address,
      city,
    };
    console.log(dogToPool);
    axios
      .post(API_URL + "/add-to-pool", dogToPool)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  removeFromPool = () => {};

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
            <h1 className="">Welcome back, {first_name} </h1>
          </div>

          <div className="profile__dog">
            <p>dogs name: {dog_name}</p>
            <img className="profile__dog-photo" src={photo} alt="dog" />

            <p>{dog_info}</p>
          </div>

          <div className="profile__status">
            <p>Do you need your dog walked today?</p>
            <button
              className="profile__poolmydog-button"
              onClick={this.addDogToPool}
            >
              Pool My Dog
            </button>
            <button
              className="profile__remove-pool"
              onClick={this.removeFromPool}
            >
              remove
            </button>
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
