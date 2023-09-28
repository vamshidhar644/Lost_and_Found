import React, { useEffect, useState } from 'react';
import ItemDetails from '../Components/ItemDetails';
import { useItemsContext } from '../hooks/useItemsContext';

import { useLocation } from 'react-router-dom';
import ItemLoader from '../Components/Loaders/ItemLoader';
import GoToTop from '../Components/GoToTop';
import '../Styles/itemsTypes.css';
import '../Styles/Items.css';
import '../Styles/ItemReturn.css';

const ItemTypes = () => {
  const location = useLocation();
  const { type } = location.state;

  const { items, dispatch } = useItemsContext();

  const [itemsArray, setItemArray] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);
  const [countitems, setCount] = useState();

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('/api/items');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_ITEMS', payload: json });
      }
    };

    fetchItems();
  }, [dispatch]);

  useEffect(() => {
    const filtered = [];
    let count = null;
    setItemArray(items);

    if (itemsArray) {
      for (let i = 0; i < itemsArray.length; i++) {
        if (type === itemsArray[i].name) {
          filtered.push(itemsArray[i]);
          count++;
        }
        if (type === 'All') {
          filtered.push(itemsArray[i]);
          count++;
        }
      }
      console.log(count);
    }

    if (type === 'All') {
      console.log(items);
    }
    setCount(count);
    if (filtered.length === 0) {
      // setFilteredArray(null);
    } else {
      setFilteredArray(filtered);
    }
  }, [items, itemsArray, type]);

  // console.log(itemsArray);

  return (
    <div className="home">
      <div className="items">
        <div className="filter-items">
          {countitems && (
            <div className="itemCount">
              {type}: {countitems} items
            </div>
          )}
        </div>

        {/* {!filteredArray && <div>No {type} found</div>} */}

        <div className="all-items">
          {filteredArray ? (
            filteredArray.map((item) => {
              return <ItemDetails key={item._id} item={item} />;
            })
          ) : <ItemLoader /> ? (
            <div>No {type} found</div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <GoToTop />
    </div>
  );
};

export default ItemTypes;
