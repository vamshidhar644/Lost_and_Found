import React from 'react';

const ItemSuggestions = () => {
  let suggestions = ['Mobile', 'Laptop', 'Water Bottle', 'Watch', 'Backpack'];

  let suggBox = document.getElementById('autocom-box');
  let searchWrapper = document.querySelector('.search-input');
  let inputBox = document.getElementById('item-inputbox');

  const handleChange = (e) => {
    let itemData = e.target.value;

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


  function selectItem(element) {
    // let selectItemData = element.textContent;
    console.log("selectItemData");
  }

  return (
    <div className="wrapper">
      <div className="search-input" id="search-input">
        <input
          type="text"
          placeholder="Item"
          onChange={handleChange}
          id="item-inputbox"
        />
        <div className="autocom-box" id="autocom-box"></div>
      </div>
    </div>
  );
};

export default ItemSuggestions;
