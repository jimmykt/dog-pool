import "./HomePage.scss";
import { Component } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../App";
import Header from "../../components/Header/Header";
import PoolCard from "../../components/PoolCard/PoolCard";

class HomePage extends Component {
  state = {
    user: null,
    failedAuth: false,
    dogPool: null,
  };

  componentDidMount() {
    const token = sessionStorage.getItem("token");

    if (!token) {
      this.setState({ failedAuth: true });
      console.log("no token");
      return;
    }
    console.log("token");

    axios
      .get(API_URL + "/current", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        this.setState({
          user: res.data,
        });
      })
      .then(() => {
        axios
          .get(API_URL + "/pool")
          .then((res) => {
            this.setState({
              dogPool: res.data,
            });
          })
          .catch((err) => console.log(err));
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
        <main className="home__failed">
          <p className="home__failed-login">
            You must be logged in to see this page.{" "}
            <Link to="/login">Log in</Link>
          </p>
        </main>
      );
    }

    if (!this.state.user || !this.state.dogPool) {
      return (
        <main className="home">
          <Header />

          <p>Loading...</p>
        </main>
      );
    }

    const { first_name, id } = this.state.user.user;
    const dogPool = this.state.dogPool;
    return (
      <>
        <Header avatar={this.state.user.dog.photo} />
        <main className="home">
          <h2 className="home__title">Going for a walk today {first_name}? </h2>
          {dogPool.map((dog) => {
            return <PoolCard dog={dog} user={this.state.user} key={id} />;
          })}
        </main>
      </>
    );
  }
}

export default HomePage;
