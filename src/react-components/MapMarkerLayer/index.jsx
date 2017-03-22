import React, { Component } from 'react';
import { LayerGroup, Marker, Popup } from 'react-leaflet';

class MapMarkerLayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaydata: this.props.data,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      displaydata: nextProps.data,
    });
  }

  render() {
    const markers = this.state.displaydata.map((datacenter) => {
      const latLng = [parseFloat(datacenter['location-lat']), parseFloat(datacenter['location-long'])];
      return (
        <Marker position={latLng} key={datacenter.name}>
          <Popup>
            <a href={`/site/${encodeURIComponent(datacenter.name)}`}>
              {datacenter.name}
            </a>
          </Popup>
        </Marker>
      );
    });

    return (
      <LayerGroup>
        {markers}
      </LayerGroup>
    );
  }
}


MapMarkerLayer.propTypes = {
  data: React.PropTypes.array.isRequired,
};

export default MapMarkerLayer;
