// import InputField from "../InputField/InputField";
//import { Link, NavLink } from "react-router-dom";
import { Component } from "react";
import axios from "axios";

import "./Header.scss";

class Header extends Component {
  state = {
    user: null,
    failedAuth: false,
    dogData: null,
  };

  componentDidMount() {
    const token = sessionStorage.getItem("token");

    if (!token) {
      this.setState({ failedAuth: true });
      return;
    }

    axios
      .get("http://localhost:8080/current", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response); ///
        this.setState({
          user: response.data,
        });
      })
      .then(() => {
        // getting dog data
        axios
          .get("http://localhost:8080/get-dog-by/" + this.state.user.id)

          .then((res) => {
            this.setState({
              dogData: res.data,
            });
            console.log(res.data);
          })
          .catch((err) => console.log(err));
        //
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          failedAuth: true,
        });
      });
  }

  render() {
    if (this.state.failedAuth) {
      return (
        <header className="header">
          <h1 className="header__title">DogPool</h1>

          <div className="header__avatar"></div>

          <div className="header__toggle">
            <span className="header__bar"></span>
            <span className="header__bar"></span>
            <span className="header__bar"></span>
          </div>
        </header>
      );
    }
    if (!this.state.dogData) {
      return (
        <main className="dashboard">
          <p>Loading...</p>
        </main>
      );
    }
    return (
      <header className="header">
        <p>{this.state.dogData.dog_name}</p>
        <img src={this.state.dogData.photo_file.data} alt="dog" />

        <h1 className="header__title">DogPool</h1>

        <div className="header__avatar"></div>
        <div className="header__toggle">
          <span className="header__bar"></span>
          <span className="header__bar"></span>
          <span className="header__bar"></span>
        </div>
      </header>
    );
  }
}
export default Header;
