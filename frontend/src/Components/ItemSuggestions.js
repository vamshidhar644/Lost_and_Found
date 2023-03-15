import React, { useState } from 'react';

const ItemSuggestions = ({ itemName }) => {
  let suggestions = ['Mobile', 'Laptop', 'Water Bottle', 'Watch', 'Backpack'];

  const searchWrapper = document.getElementById('search-input');

  const [isVisible, setVisibilty] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);
  const [itemNames, setItems] = useState([]);
  const [newItem, setNewItem] = useState();

  const handleChange = (e) => {
    let itemData = e.target.value;
    setVisibilty(true);
    let emptyArrray = [];
    if (itemData) {
      emptyArrray = suggestions.filter((data) => {
        return data.toLocaleLowerCase().includes(itemData.toLocaleLowerCase());
      });

      setItems(emptyArrray);
      searchWrapper.classList.add('item-active');
    } else {
      searchWrapper.classList.remove('item-active');
    }
    if (!itemNames.length) {
      itemNames[0] = itemData;
      setNewItem(itemNames[0]);
    } else {
      setNewItem(itemNames.join(''));
    }
  };

  function select(element) {
    document.getElementById('item-inputbox').value = element;

    itemName(element);
    setVisibilty(false);
  }

  // console.log(itemNames)

  return (
    <div className="wrapper">
      <div className="search-input" id="search-input">
        <input
          type="text"
          className={emptyFields.includes('name') ? 'error' : ''}
          onChange={handleChange}
          id="item-inputbox"
        />
        <div
          className={`autocom-box ${isVisible ? 'visible' : 'invisible'}`}
          id="autocom-box"
        >
          {itemNames.map((itemSugg, ind) => {
            return (
              <li key={ind} onClick={() => select(itemSugg)}>
                {itemSugg}
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ItemSuggestions;
