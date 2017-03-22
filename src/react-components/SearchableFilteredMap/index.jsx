import React from 'react';

import Map from '../Map/index.jsx';
import SearchBar from '../SearchBar/index.jsx';
import FilterBox from '../FilterBox/index.jsx'

class SearchableFilteredMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filtereddata: this.props.data,
      displaydata: this.props.data,
    };

    this.updateDisplayData = (data) => {
      this.setState({
        displaydata: data,
      });
    };

    this.processSearchResult = (results) => {
      this.updateDisplayData(results);
    };

    this.processFilterResult = (checkedfilters) => {
      const results = [];
      this.updateDisplayData(this.state.filtereddata);
    };
  }

  render() {
    return (
      <div>
        <Map data={this.state.displaydata} height={this.props.mapheight} />
        <div className="row">
          <div className="col s3">
            <FilterBox options={this.props.filteroptions} processResult={this.processFilterResult} />
          </div>
          <div className="col s9">
            <SearchBar data={this.state.filtereddata} options={this.props.searchoptions} processResult={this.processSearchResult} />
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
