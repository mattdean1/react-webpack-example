import React from 'react';

import Map from '../Map/index.jsx';
import SearchBar from '../SearchBar/index.jsx';
import FilterBox from '../FilterBox/index.jsx'

class SearchableFilteredMap extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Map data={this.props.data} height={this.props.mapheight} />
        <div className="row">
          <div className="col s3">
            <FilterBox options={this.props.filteroptions} />
          </div>
          <div className="col s9">
            <SearchBar data={this.props.data} options={this.props.searchoptions} />
          </div>
        </div>
      </div>
    );
  }
}

SearchableFilteredMap.propTypes = {
  data:           React.PropTypes.array.isRequired,
  searchoptions:  React.PropTypes.object.isRequired,
  filteroptions:  React.PropTypes.object.isRequired,
  mapheight:      React.PropTypes.number.isRequired,
};

export default SearchableFilteredMap;
