import "./PoolMePage.scss";
import { Component } from "react";
import Header from "../../components/Header/Header";
import { getDog } from "../../Util/axiosUtil";
import axios from "axios";
import { API_URL } from "../../App";
import Map from "../../components/Map/Map";

class PoolMePage extends Component {
  state = {
    dogToPool: null,
  };

  componentDidMount() {
    getDog();
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
            <p className="PoolMePage__dog-info">
              {pool.first_name + " " + pool.last_name}
            </p>
            <p className="PoolMePage__dog-info">{pool.email}</p>
            <p className="PoolMePage__dog-info">{pool.phone_number}</p>
            <p className="PoolMePage__dog-info">{pool.city}</p>
            <p className="PoolMePage__dog-info">{pool.address}</p>

            {/* map */}
            <Map />
            {/* 
            <div className="jumbotron">
              <div className="container-fluid">
                <h1>Find the distance</h1>
                <form className="form-horizontal">
                  <div className="form-group">
                    <label for="from">
                      <input type="text" id="from" placeholder="orgin" />
                    </label>
                    <div className="form-group">
                      <label for="from">
                        <input type="text" id="to" placeholder="destination" />
                      </label>
                    </div>
                  </div>
                </form>

                <div>
                  <button>Go</button>
                </div>

                <div className="container">
                  <div id="googleMap"></div>
                  <div id="output"></div>
                </div>
              </div>
            </div>
             */}
            {/* map */}
          </div>
        </main>
      </>
    );
  }
}

export default PoolMePage;
