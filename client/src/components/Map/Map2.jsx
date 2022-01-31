import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../../App";

import {
  DirectionsRenderer,
  GoogleMap,
  LoadScript,
  DirectionsService,
} from "@react-google-maps/api";
import "./Map.scss";

const containerStyle = {
  width: "100%",
  height: "340px",
};

const center = {
  lat: 43.64563,
  lng: -79.39545,
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null,
      travelMode: "WALKING",
      origin: "",
      destination: "",
      loaded: false,
      km: null,
      time: null,
    };
    this.directionsCallback = this.directionsCallback.bind(this);
  }

  componentDidMount() {
    this.setState(() => ({
      destination: this.props.destination,
      origin: this.props.origin,
      loaded: true,
    }));
  }

  directionsCallback = (response) => {
    // console.log(response);
    if (response !== null) {
      if (response.status === "OK") {
        this.setState(() => ({
          response,
          km: response.routes[0].legs[0].distance.text,
        }));
      } else {
        console.log("response: ", response);
      }
    }
  };

  render() {
    if (!this.state.loaded) {
      return <p>loading..</p>;
    }
    return (
      <div className="Map">
        <p>{this.state.km + " away"}</p>
        <LoadScript googleMapsApiKey="AIzaSyDZ4HxogFXeESTTN2JXpPpjCRozf7vEfIk">
          <GoogleMap
            id="direction-example"
            mapContainerStyle={{
              height: "400px",
              width: "100%",
            }}
            zoom={2}
            center={{
              lat: 0,
              lng: -180,
            }}
            onClick={this.onMapClick}
            onLoad={(map) => {
              // console.log("DirectionsRenderer onLoad map: ", map);
            }}
            onUnmount={(map) => {
              // console.log("DirectionsRenderer onUnmount map: ", map);
            }}
          >
            {this.state.destination !== "" && this.state.origin !== "" && (
              <DirectionsService
                options={{
                  destination: this.state.destination,
                  origin: this.state.origin,
                  travelMode: this.state.travelMode,
                }}
                callback={this.directionsCallback}
                onLoad={(directionsService) => {
                  console.log(
                    "DirectionsService onLoad directionsService: ",
                    directionsService
                  );
                }}
                onUnmount={(directionsService) => {
                  console.log(
                    "DirectionsService onUnmount directionsService: ",
                    directionsService
                  );
                }}
              />
            )}

            {this.state.response !== null && (
              <DirectionsRenderer
                options={{
                  directions: this.state.response,
                }}
                onLoad={(directionsRenderer) => {
                  // console.log(
                  //   "DirectionsRenderer onLoad directionsRenderer: ",
                  //   directionsRenderer
                  // );
                }}
                onUnmount={(directionsRenderer) => {
                  console.log(
                    "DirectionsRenderer onUnmount directionsRenderer: ",
                    directionsRenderer
                  );
                }}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    );
  }
}

export default Map;
