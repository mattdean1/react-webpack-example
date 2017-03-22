import React from 'react';

const FilterBox = (props) => {
  return (
    <div>
      <div>Filterbox</div>
      <form>
        <h5>Type</h5>
        <p>
          <input type="checkbox" />
          Datacenter
        </p>
        <p>
          <input type="checkbox" />
          Elanco
        </p>
        <p>
          <input type="checkbox" />
          Pharma
        </p>
        <p>
          <input type="checkbox" />
          Other
        </p>

        <h5>Zone</h5>
        <p>
          <input type="checkbox" />
          Zone 1
        </p>
        <p>
          <input type="checkbox" />
          Zone 1
        </p>
        <p>
          <input type="checkbox" />
          Zone 1
        </p>
      </form>
    </div>
  );
};

export default FilterBox;
