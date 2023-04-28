import React, { useEffect, useState } from 'react';
import ItemDetails from '../Components/ItemDetails';
import { useItemsContext } from '../hooks/useItemsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link, useLocation } from 'react-router-dom';
import ItemLoader from '../Loaders/ItemLoader';
import GoToTop from '../Components/GoToTop';

const ItemTypes = () => {
  const location = useLocation();
  const { type } = location.state;

  const { items, dispatch } = useItemsContext();
  const { user } = useAuthContext();

  const [itemsArray, setItemArray] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);
  const [countitems, setCount] = useState();
  const [errorcount, setErrorcount] = useState('');

  useEffect(() => {
    const adminfetchItem = async () => {
      const response = await fetch('/api/items', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_ITEMS', payload: json });
      }
    };

    const fetchItems = async () => {
      const response = await fetch('/api/items');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_ITEMS', payload: json });
      }
    };

    if (user) {
      adminfetchItem();
    } else {
      fetchItems();
    }
  }, [dispatch, user]);

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
      }
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
              {type}: {countitems}
            </div>
          )}
          {!countitems && <div className="errorCount">{errorcount}</div>}
        </div>

        <div className="all-items">
          {!countitems && <div>No {type} found</div>}
          {filteredArray ? (
            filteredArray.map((item) => {
              return <ItemDetails key={item._id} item={item} />;
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

export default ItemTypes;
