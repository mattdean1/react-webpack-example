import React from 'react';
import ReactDOM from 'react-dom';

import SearchableFilteredMap from '../react-components/SearchableFilteredMap/index.jsx';

const searchoptions = { keys: ['profile.name'], minMatchCharLength: 1, distance: 40, threshold: 0.4 };

const filteroptions = {
  zone: ['Zone 1', 'Zone 2', 'Zone 3'],
  category: ['Datacenter', 'Pharma', 'Elanco', 'Other'],
};

const mapheight = 500;

ReactDOM.render(
  <SearchableFilteredMap source={'/api/sites/profile/all'} searchoptions={searchoptions} filteroptions={filteroptions} mapheight={mapheight} />,
  document.getElementById('app'),
);
