import React from 'react';
import ReactDOM from 'react-dom';

import MapExample from '../react-components/Map/index.jsx';
import SearchBar from '../react-components/SearchBar/index.jsx';

const datacenters = [
  {
    name: '141',

  },
  {
    name: '22/5',
  },
  {
    name: 'Alcobendas 50',
  },
  {
    name: 'Alcobendas 900',
  },
  {
    name: 'Augusta',
  },
  {
    name: 'Aurora',
  },
];

const searchoptions = { keys: ['name'] };

ReactDOM.render(
  <div style={{ height: '500px' }}>
    <MapExample />
  </div>,
  document.getElementById('map'),
);


ReactDOM.render(
  <SearchBar searchdata={datacenters} searchoptions={searchoptions} />,
  document.getElementById('searchbar'),
);
