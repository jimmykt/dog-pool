import "./PoolMePage.scss";
import { Component } from "react";
import Header from "../../components/Header/Header";
import axios from "axios";
import { API_URL } from "../../App";
import Map from "../../components/Map/Map";
import Map2 from "../../components/Map/Map2";

class PoolMePage extends Component {
  state = {
    user: null,
    dogToPool: null,
    destination: null,
    origin: null,
    loaded: false,
  };

  componentDidMount() {
    axios
      .get(API_URL + "/pool/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          dogToPool: res.data,
          destination: res.data.address + " " + res.data.city,
        });
      })
      .then(() => {
        const token = sessionStorage.getItem("token");
        axios
          .get(API_URL + "/current", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            this.setState({
              origin: res.data.user.address + " " + res.data.user.city,
              loaded: true,
            });
          })
          .catch((err) => {
            console.log(err + "eeeeee");
          });
      })
      .catch((err) => console.log(err));
  }

  renderMap = () => {
    if (!this.state.loaded) {
      return <p>loading...</p>;
    } else {
      return (
        <Map2 destination={this.state.destination} origin={this.state.origin} />
      );
    }
  };

  render() {
    if (!this.state.dogToPool) {
      return (
        <main>
          <p>Loading...</p>
        </main>
      );
    }

    const pool = this.state.dogToPool;
    return (
      <>
        <Header />
        <main className="PoolMePage">
          <div className="PoolMePage__dog-container">
            <div>
              <h1 className="PoolMePage__name">{pool.dog_name}</h1>
              <img
                className="PoolMePage__photo"
                src={pool.photo}
                alt="dog"
              ></img>
            </div>

            <p className="PoolMePage__dog-info">{pool.dog_info}</p>
          </div>

          <div>
            <div className="PoolMePage__contact-container">
              <div>
                <p className="PoolMePage__contact-info">
                  {"contact: " + pool.first_name + " " + pool.last_name}
                </p>
                <p className="PoolMePage__contact-info">{pool.email}</p>
                <p className="PoolMePage__contact-info">{pool.phone_number}</p>
                <p className="PoolMePage__contact-info">{pool.city}</p>
                <p className="PoolMePage__contact-info">{pool.address}</p>
              </div>
              <button className="PoolMePage__chat-button">Chat</button>
            </div>

            {this.renderMap()}
            {/* <Map address={pool.address} city={this.city} /> */}

            {/* <Map2
              destination={this.state.destination}
              origin={this.state.origin}
            /> */}
          </div>
        </main>
      </>
    );
  }
}

export default PoolMePage;
