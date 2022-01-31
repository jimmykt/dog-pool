import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import "./Map.scss";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 43.642039,
      lng: -79.412007,
    },
    zoom: 17,
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDZ4HxogFXeESTTN2JXpPpjCRozf7vEfIk" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <div className="Map__Marker">
            <AnyReactComponent
              lat={43.642052}
              lng={-79.412003}
              text="My Marker"
            />
          </div>
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;

/*
import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

const mapStyles = {
  width: "75%",
  height: "50%",
};

export class MapContainer extends Component {
  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={16}
          style={mapStyles}
          initialCenter={{
            lat: 43.64,
            lng: -79.39,
          }}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDZ4HxogFXeESTTN2JXpPpjCRozf7vEfIk",
})(MapContainer);


*/
