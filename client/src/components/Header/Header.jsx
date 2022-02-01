import "./Header.scss";

import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../App";

class Header extends Component {
  state = {
    user: null,
    dog: null,

    failedAuth: false,
    loginCheck: false,
  };

  loginCheck = () => {
    this.setState({
      loginCheck: true,
    });
    return true;
  };

  componentDidMount() {
    const token = sessionStorage.getItem("token");
    if (!token) {
      this.setState({ failedAuth: true });
      return;
    } else {
      this.setState({ loginCheck: true });
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
  }

  render() {
    if (this.state.failedAuth) {
      return (
        <header className="header">
          <h1 className="header__title">DogPool</h1>
          <div className="header__toggle">
            <span className="header__bar"></span>
            <span className="header__bar"></span>
            <span className="header__bar"></span>
          </div>
        </header>
      );
    }
    if (!this.state.user || !this.state.dog) {
      return (
        <main className="profile">
          <p>Loading...</p>
        </main>
      );
    }
    if (this.loginCheck) {
      return (
        <header className="header">
          <Link to="/profile">
            <img
              className="header__avatar"
              src={this.state.dog.photo}
              alt="dog"
            />
          </Link>

          <Link to="/" className="header__title">
            <h1 className="header__title">DogPool</h1>
          </Link>
          <div className="header__toggle">
            <span className="header__bar"></span>
            <span className="header__bar"></span>
            <span className="header__bar"></span>
          </div>
        </header>
      );
    }
  }
}
export default Header;
