import React, { useEffect, useState } from 'react';

import { UseItemTypesContext } from '../../context/useContexts';
import './Suggestions.css';
import fetchMongo from '../../helpers/fetchMongo';
const Suggestions = ({ onChange, user }) => {
  const { itemTypes, itemTypedispatch } = UseItemTypesContext();

  const [itemType, setitemType] = useState('');

  const { fetchItemTypes } = fetchMongo();
  useEffect(() => {
    if (user) {
      fetchItemTypes();
    }
  }, [itemTypedispatch, user]);

  function SelectOpt() {
    const type = document.getElementById('input-box').value;
    setitemType(type);
    onChange(type);
    for (let i = 0; i < itemTypes.length; i++) {
      if (itemTypes[i].itemType === type || type === '') {
        document.getElementById('new-item').style.display = 'none';
        break;
      } else {
        document.getElementById('new-item').style.display = 'block';
      }
    }
  }

  const NewElement = async () => {
    const confirmed = window.confirm('Add ' + itemType + ' to item types');
    if (confirmed) {
      // console.log(itemType);
      const itemTypes = { itemType };
      const response = await fetch('/api/itemTypes', {
        method: 'POST',
        body: JSON.stringify(itemTypes),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();
      if (!response.ok) {
        console.log(json.error);
      }
      if (response.ok) {
        setitemType('');
        itemTypedispatch({ type: 'CREATE_ITEM', payload: json });
      }
      // Do something if the user confirms
    } else {
      // Do something if the user cancels
    }
  };

  return (
    <div className="suggestion-parent">
      <input
        id="input-box"
        name="item_list"
        type="text"
        list="Input-box"
        onChange={SelectOpt}
      />
      <datalist id="Input-box">
        {itemTypes &&
          itemTypes.map((itemType, ind) => {
            return (
              <option key={ind} value={itemType.itemType}>
                {itemType.itemType}
              </option>
            );
          })}
      </datalist>
      <p onClick={NewElement} id="new-item" className="new-item">
        New
      </p>
    </div>
  );
};

export default Suggestions;
