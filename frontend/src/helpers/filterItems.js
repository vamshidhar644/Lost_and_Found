import { useState } from 'react';

const FilterItems = () => {
  const [filteredArray, setFilteredArray] = useState([]);

  const filter = (items, type) => {
    if (items) {
      if (type === 'All Items') {
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
