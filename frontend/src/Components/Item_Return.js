import React, { useEffect, useState } from 'react';
import ItemDetails from './ItemDetails';
import { useItemsContext } from '../hooks/useItemsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useItemTypesContext } from '../hooks/useItemTypeContext';
import '../Styles/ItemReturn.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';

const Item_Return = () => {
  const { items, dispatch } = useItemsContext();
  const { itemTypes, itemTypedispatch } = useItemTypesContext();

  const [selectedValue, setSelectedValue] = useState('');
  const [itemsArray, setItemArray] = useState('');
  const [arrLength, setArraylength] = useState('');
  const [filteredArray, setFilteredArray] = useState('');
  const [countitems, setCount] = useState();
  const [errorcount, setErrorcount] = useState('');
  const { user } = useAuthContext();

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

    const fetchItemTypes = async () => {
      const itemTyperesponse = await fetch('/api/itemTypes');
      const json = await itemTyperesponse.json();

      if (itemTyperesponse.ok) {
        itemTypedispatch({ type: 'SET_ITEMS', payload: json });
      }
    };

    if (user) {
      adminfetchItem();
    } else {
      fetchItems();
    }
    fetchItemTypes();
  }, [dispatch, itemTypedispatch, user]);

  useEffect(() => {
    const filtered = [];
    let count = null;
    setItemArray(items);

    if (arrLength) {
      for (let i = 0; i < arrLength; i++) {
        if (selectedValue === itemsArray[i].name) {
          filtered.push(itemsArray[i]);
          count++;
        }
      }
    }
    setCount(count);
    if (filtered.length === 0) {
      setFilteredArray(itemsArray);
    } else {
      setFilteredArray(filtered);
    }
  }, [arrLength, items, itemsArray, selectedValue]);

  function handleChange(event) {
    setSelectedValue(event.target.value);
    setArraylength(itemsArray.length);
    if (countitems === null) {
      setErrorcount('No such item');
    }
  }
  if(filteredArray){
    
  // console.log(filteredArray[0].imgpath.data.data);
  }
  return (
    <div className="home">
      <div className="items">
        {user && (
          <div className="all-buttons">
            <Link to="/" className="Returned-btn">
              Home
            </Link>
            <Link to="/item-entry" className="Returned-btn">
              Item Entry
            </Link>
            <Link to="/all-entries" className="Returned-btn">
              All Entries
            </Link>
          </div>
        )}

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
          {filteredArray &&
            filteredArray.map((item) => (
              <ItemDetails key={item._id} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Item_Return;
