import "./Header.scss";

import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Header extends Component {
  state = {
    user: null,
    failedAuth: false,
    dogData: null,

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
    }
    /*
    axios
      .get("http://localhost:8080/current", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
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

      */
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

    if (this.loginCheck) {
      return (
        <header className="header">
          {/* <p>{this.state.dogData.dog_name}</p> */}

          <Link to="/profile">
            <div className="header__avatar"></div>
          </Link>

          <h1 className="header__title">DogPool</h1>
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
