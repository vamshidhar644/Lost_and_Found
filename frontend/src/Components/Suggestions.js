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

  const [ele, setElement] = useState('');
  function SelectOpt() {
    const type = document.getElementById('input-box').value;
    onChange(type);
    setElement(type);
    for (let i = 0; i < itemTypes.length; i++) {
      if (itemTypes[i].itemType === type) {
        document.getElementById('new-item').style.display = 'none';
        break;
      } else {
        document.getElementById('new-item').style.display = 'block';
      }
    }
  }

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const NewElement = async () => {
    const TypeofItem = { ele };
    // console.log(ele);
    const response = await fetch('/api/itemTypes', {
      method: 'POST',
      body: JSON.stringify(TypeofItem),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } 
    if (response.ok) {
      setError(null);
      setEmptyFields([]);
      // console.log('new item added', json);
      itemTypedispatch({ type: 'CREATE_ITEM', payload: json });
    }
    console.log(error);
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
      <p onClick={NewElement} id="new-item">
        New
      </p>
    </div>
  );
};

export default Suggestions;
