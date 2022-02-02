import React, { Component } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  LoadScript,
  DirectionsService,
} from "@react-google-maps/api";
class Distance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travelMode: "WALKING",
      origin: "",
      destination: "",
      km: null,
      time: null,
    };
    this.directionsCallback = this.directionsCallback.bind(this);
    console.log(props.origin);
  }
  componentDidMount() {
    this.setState({
      origin: this.props.origin,
      destination: this.props.destination,
    });
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
    return (
      <div>
        <p>{this.state.km + " away"}</p>
        <LoadScript googleMapsApiKey="AIzaSyDZ4HxogFXeESTTN2JXpPpjCRozf7vEfIk">
          <DirectionsService
            options={{
              destination: this.state.destination,
              origin: this.state.origin,
              travelMode: this.state.travelMode,
            }}
            callback={this.directionsCallback}
            onLoad={(directionsService) => {}}
            onUnmount={(directionsService) => {}}
          />
        </LoadScript>
      </div>
    );
  }
}

export default Distance;
