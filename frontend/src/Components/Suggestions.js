import React, { useState, useEffect } from 'react';
import Autocomplete from 'react-autocomplete';
import { useAuthContext } from '../hooks/useAuthContext';
import { useItemTypesContext } from '../hooks/useItemTypeContext';

function Suggestions() {
  const { itemTypes, itemTypedispatch } = useItemTypesContext();
  const { user } = useAuthContext();

  const [value, setValue] = useState('');

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

  return (
    <div>
      <Autocomplete
        items={itemTypes}
        shouldItemRender={(item, value) =>
          item.itemType.toLowerCase().indexOf(value.toLowerCase()) > -1
        }
        getItemValue={(item) => item.itemType}
        renderItem={(item, isHighlighted) => (
          // Styling to highlight selected item
          <div
            className="sugg-list"
            style={{
              background: isHighlighted ? '#1aac83' : 'white',
              // padding: '8px 12px',
              width: 'inherit',
              padding: '0px',
            }}
            key={item._id}
          >
            {item.itemType}
          </div>
        )}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onSelect={(val) => setValue(val)}
        // Added style in Autocomplete component
      />
    </div>
  );
}

export default Suggestions;
