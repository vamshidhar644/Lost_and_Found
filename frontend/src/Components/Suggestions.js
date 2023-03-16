import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useItemTypesContext } from '../hooks/useItemTypeContext';

const Suggestions = ({ onChange }) => {
  const { itemTypes, itemTypedispatch } = useItemTypesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchItemTypes = async () => {
      const itemTyperesponse = await fetch('/api/itemTypes', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await itemTyperesponse.json();

      if (itemTyperesponse.ok) {
        itemTypedispatch({ type: 'SET_ITEMS', payload: json });
      }
    };

    if (user) {
      fetchItemTypes();
    }
  });

  function SelectOpt() {
    const type = document.getElementById('input-box').value;
    onChange(type);
  }
  // console.log(text);
  const [ele, setElement] = useState('');

  // document.getElementById('new-item').style.display = 'none';

  // newBtn.style.display = 'none';

  function handleChange(element) {
    setElement(element);

    // for (let i = 0; i < itemTypes.length; i++) {
    //   if (itemTypes[i].itemType !== ele) {
    //     console.log('not present');
    //     // document.getElementById('new-item').style.display = 'block';
    //   }
    //   if (itemTypes[i].itemType === ele) {
    //     console.log('present');
    //     // document.getElementById('new-item').style.display = 'none';
    //   }
    // }
  }

  function checlElement() {}

  return (
    <div className="suggestion-parent">
      <input
        list="item-types"
        id="input-box"
        onChange={SelectOpt}
        onKeyDown={(e) => handleChange(e.target.value)}
      />
      <datalist id="item-types">
        {itemTypes &&
          itemTypes.map((itemType, ind) => {
            return (
              <option key={ind} value={itemType.itemType}>
                {itemType.itemType}
              </option>
            );
          })}
        {/* <option>Russia</option> */}
      </datalist>
      <p onClick={checlElement} id="new-item">
        New
      </p>
    </div>
  );
};

export default Suggestions;
