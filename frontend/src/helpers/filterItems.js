import { useState } from 'react';

const FilterItems = () => {
  const [filteredArray, setFilteredArray] = useState([]);

  const filter = (items, type) => {
    // console.log(type);
    if (items) {
      if (type === 'all-items') {
        setFilteredArray([...items]);
      } else {
        const filterrr = items.filter((item) => item.name === type);
        setFilteredArray(filterrr);
      }
    }
  };
  return { filter, filteredArray };
};

export default FilterItems;
