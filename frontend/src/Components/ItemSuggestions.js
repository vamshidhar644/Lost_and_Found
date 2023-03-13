import React, { useState } from 'react';

const ItemSuggestions = ({itemName}) => {
  let suggestions = ['Mobile', 'Laptop', 'Water Bottle', 'Watch', 'Backpack'];

  const searchWrapper = document.getElementById('search-input');
  const suggBox = document.getElementById('autocom-box');
  let inputBox = document.getElementById('item-inputbox');


  const [emptyFields, setEmptyFields] = useState([]);

  const handleChange = (e) => {
    let itemData = e.target.value;
    itemName(itemData);

    let emptyArrray = [];
    if (itemData) {
      emptyArrray = suggestions.filter((data) => {
        return data.toLocaleLowerCase().includes(itemData.toLocaleLowerCase());
      });
      emptyArrray = emptyArrray.map((data) => {
        return (data = '<li>' + data + '</li>');
      });

      //   console.log(emptyArrray);

      searchWrapper.classList.add('item-active');
      showSuggestion(emptyArrray);

    } else {
      searchWrapper.classList.remove('item-active');
    }
  };

  function select(element) {
    let selectItem = element;
    console.log(selectItem);
  }

  function showSuggestion(list) {
    let listData;
    if (!list.length) {
      let itemValue = inputBox.value;
      listData = '<li>' + itemValue + '</li>';
    } else {
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
  }

  return (
    <div className="wrapper">
      <div className="search-input" id="search-input">
        <input type="text" className={emptyFields.includes('name') ? 'error' : ''} onChange={handleChange} id="item-inputbox" />
        <div className="autocom-box" id="autocom-box"></div>
      </div>
    </div>
  );
};

export default ItemSuggestions;
