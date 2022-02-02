import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";

import "./Map.scss";
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  state = {
    loading: true,
    center: {
      lat: 43.64563,
      lng: -79.39545,
    },
    zoom: 14,
  };
  // static defaultProps = {
  //   center: {
  //     lat: 43.642039,
  //     lng: -79.412007,
  //   },
  //   zoom: 17,
  // };

  componentDidMount() {
    // Get latitude & longitude from address.
    Geocode.setApiKey("AIzaSyDZ4HxogFXeESTTN2JXpPpjCRozf7vEfIk");
    Geocode.fromAddress(this.props.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        console.log(this.state.center);
        console.log(this.state.loading);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  componentDidUpdate() {}

  render() {
    if (!this.state.loading) {
      return <p>loading</p>;
    } else {
      return (
        <div style={{ height: "40vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyDZ4HxogFXeESTTN2JXpPpjCRozf7vEfIk",
            }}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
          >
            <div className="Map__Marker">
              <AnyReactComponent
                lat={this.state.center.lat}
                lng={this.state.center.lng}
                text="."
              />
            </div>
          </GoogleMapReact>
        </div>
      );
    }
  }
}

export default Map;
