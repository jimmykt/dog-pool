import "./PoolMePage.scss";
import { Component } from "react";
import Header from "../../components/Header/Header";
import axios from "axios";
import { API_URL } from "../../App";
import Map from "../../components/Map/Map";

class PoolMePage extends Component {
  state = {
    dogToPool: null,
  };

  componentDidMount() {
    axios
      .get(API_URL + "/pool/" + this.props.match.params.id)
      .then((res) => {
        console.log(res.data);
        this.setState({
          dogToPool: res.data,
        });
      })
      .then(() => {
        axios.get(
          "https://maps.googleapis.com/maps/api/directions/outputFormat?parameters"
        );
      })
      .catch((err) => console.log(err));
  }

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
            <p className="PoolMePage__contact-info">
              {"contact: " + pool.first_name + " " + pool.last_name}
            </p>
            <p className="PoolMePage__contact-info">{pool.email}</p>
            <p className="PoolMePage__contact-info">{pool.phone_number}</p>
            <p className="PoolMePage__contact-info">{pool.city}</p>
            <p className="PoolMePage__contact-info">{pool.address}</p>

            <Map address={pool.address} city={this.city} />
          </div>
        </main>
      </>
    );
  }
}

export default PoolMePage;
