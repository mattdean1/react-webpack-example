import React, { Component } from 'react';
import { LayerGroup, Marker, Popup } from 'react-leaflet';

class MapMarkerLayer extends Component {
  constructor(props) {
    super(props);

    this.markers = props.data.map((datacenter) => {
      const latLng = [parseFloat(datacenter['location-lat']), parseFloat(datacenter['location-long'])];
      console.log(latLng);
      return (
        <Marker position={latLng}>
          <Popup>
            <a href={`/site/${encodeURIComponent(datacenter.name)}`}>
              {datacenter.name}
            </a>
          </Popup>
        </Marker>
      );
    });
  }

  render() {
    return (
      <LayerGroup>
        {this.markers}
      </LayerGroup>
    );
  }
}


MapMarkerLayer.propTypes = {
  data: React.PropTypes.array.isRequired,
};

export default MapMarkerLayer;
