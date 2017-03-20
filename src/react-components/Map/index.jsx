import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import MapMarkerLayer from '../MapMarkerLayer/index.jsx';

const id = 'deanmatt.196lfc2a';
const accessToken = 'pk.eyJ1IjoiZGVhbm1hdHQiLCJhIjoiY2lzamdpdXJxMDAzMTJ0cm5nOWNyb3pnMSJ9.z8vZUaEEP1a4Akowh6Vzlw';

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13,
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <div style={{ height: `${this.props.height}px` }}>
        <LeafletMap center={position} zoom={this.state.zoom}>
          <TileLayer
            url={'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'}
            id={id}
            accessToken={accessToken}
            maxZoom={18}
          />
          <MapMarkerLayer data={this.props.data} />
        </LeafletMap>
      </div>
    );
  }
}


Map.propTypes = {
    // props function that updates articles in CategoriesList
  height: React.PropTypes.number.isRequired,
  data: React.PropTypes.array.isRequired,
};

export default Map;
