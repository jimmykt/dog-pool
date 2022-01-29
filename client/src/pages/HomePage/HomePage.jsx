import "./HomePage.scss";
import { Component } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../App";
import Header from "../../components/Header/Header";

class HomePage extends Component {
  state = {
    user: null,
    failedAuth: false,

    dogsNeedPoolData: null,
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
      .then((response) => {
        this.setState({
          user: response.data,
        });
      })
      .then(() => {})
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
        <main className="dashboard">
          <p>
            You must be logged in to see this page.{" "}
            <Link to="/login">Log in</Link>
          </p>
        </main>
      );
    }

    if (!this.state.user) {
      return (
        <main className="dashboard">
          <p>Loading...</p>
        </main>
      );
    }

    const { first_name, last_name } = this.state.user;

    return (
      <>
        <Header />
        <main className="home">
          <h1 className="">Home Page</h1>
          <p>
            Welcome back, {first_name} {last_name}! 👋
          </p>
        </main>
      </>
    );
  }
}

export default HomePage;
