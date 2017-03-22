import React from 'react';
import ReactDOM from 'react-dom';

import SearchableFilteredMap from '../react-components/SearchableFilteredMap/index.jsx';

let datacenters = [
  {
    name: '141',
    'location-lat': '39.7684',
    'location-long': '-86.1581',
  },
  {
    name: '22/5',
    'location-lat': '36.060199',
    'location-long': '-115.209982',
  },
  {
    name: 'Alcobendas 50',
    'location-lat': '9.7684',
    'location-long': '-0.09',
  },
  {
    name: 'Alcobendas 900',
    'location-lat': '39.7684',
    'location-long': '-86.1581',
  },
  {
    name: 'Augusta',
    'location-lat': '39.7684',
    'location-long': '-86.1581',
  },
  {
    name: 'Aurora',
    'location-lat': '39.7684',
    'location-long': '-86.1581',
  },
];


const searchoptions = { keys: ['name'], minMatchCharLength: 1 };

const filteroptions = {
  zone: ['Zone 1', 'Zone 2', 'Zone 3'],
  category: ['Datacenter', 'Pharma', 'Elanco', 'Other'],
};

const mapheight = 500;

ReactDOM.render(
  <SearchableFilteredMap data={datacenters} searchoptions={searchoptions} filteroptions={filteroptions} mapheight={mapheight} />,
  document.getElementById('app'),
);
