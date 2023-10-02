import React, { useEffect, useState } from 'react';
import ItemDetails from '../../../Components/ItemDetails';

import '../Styles/ItemReturn.css';
import 'react-datepicker/dist/react-datepicker.css';

import GoToTop from '../../../Components/GoToTop';
import ItemLoader from '../Loaders/ItemLoader';
import fetchMongo from '../../../helpers/fetchMongo';
import FilterItems from '../../../helpers/filterItems';

const Item_Return = ({ user }) => {
  const { fetchItems, fetchItemTypes, items, itemTypes } = fetchMongo();
  const { filter } = FilterItems();

  const [selectedValue, setSelectedValue] = useState('');
  const [itemsArray, setItemArray] = useState('');
  const [arrLength, setArraylength] = useState('');
  const [filteredArray, setFilteredArray] = useState('');
  const [countitems, setCount] = useState();
  const [errorcount, setErrorcount] = useState('');

  useEffect(() => {
    fetchItems();
    fetchItemTypes();
  }, [user]);

  useEffect(() => {
    filter();
  }, [arrLength, items, itemsArray, selectedValue]);

  function handleChange(event) {
    setSelectedValue(event.target.value);
    setArraylength(itemsArray.length);
    if (countitems === null) {
      setErrorcount('No such item');
    }
  }

  return (
    <div className="home">
      <div className="items">
        <div className="filter-items">
          <select
            value={selectedValue}
            onChange={handleChange}
            className="select-types"
          >
            <option value="" className="option-type">
              Select item type
            </option>
            {itemTypes &&
              itemTypes.map((itemType, ind) => {
                return (
                  <option
                    key={ind}
                    value={itemType.itemType}
                    className="option-type"
                  >
                    {itemType.itemType}
                  </option>
                );
              })}
          </select>
          {countitems && (
            <div className="itemCount">
              {countitems}
              <span> items</span>
            </div>
          )}
          {!countitems && <div className="errorCount">{errorcount}</div>}
        </div>

        <div className="all-items">
          {filteredArray ? (
            filteredArray.map((item) => {
              return <ItemDetails key={item._id} item={item} user={user} />;
            })
          ) : (
            <ItemLoader />
          )}
        </div>
      </div>
      <GoToTop />
    </div>
  );
};

export default Item_Return;
