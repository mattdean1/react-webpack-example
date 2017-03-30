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
      if (!isNaN(parseFloat(datacenter.profile['location-lat'])) && !isNaN(parseFloat(datacenter.profile['location-long']))) {
        const latLng = [parseFloat(datacenter.profile['location-lat']), parseFloat(datacenter.profile['location-long'])];
        return (
          <Marker position={latLng} key={datacenter.profile.name}>
            <Popup>
              <a href={`/site/${encodeURIComponent(datacenter.profile.name)}`}>
                {datacenter.profile.name}
              </a>
            </Popup>
          </Marker>
        );
      }
      return null;
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
