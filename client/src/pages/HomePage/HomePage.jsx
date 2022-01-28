import "./HomePage.scss";
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class HomePage extends Component {
  state = {
    user: null,
    failedAuth: false,
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
        this.setState({
          user: response.data,
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
      <main className="">
        <h1 className="">Dashboard</h1>
        <p>
          Welcome back, {first_name} {last_name}! 👋
        </p>
        <button className="dashboard__logout" onClick={this.handleLogout}>
          Log out
        </button>
      </main>
    );
  }
}

export default HomePage;
