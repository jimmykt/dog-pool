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
          <Link to="/profile">
            <img className="header__avatar" src={this.props.avatar} alt="" />
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
