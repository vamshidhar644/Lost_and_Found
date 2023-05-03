import React from 'react';
import { useItemTypesContext } from '../hooks/useItemTypeContext';
import { useEffect } from 'react';
import '../Styles/ItemReturn.css';
import { Link } from 'react-router-dom';
import RandomIcon from '../Components/ShapeGenerator';
import { BsBorderAll } from 'react-icons/bs';
import { useAuthContext } from '../hooks/useAuthContext';

const ItemReturn = () => {
  const { itemTypes, itemTypedispatch } = useItemTypesContext();
  const { user } = useAuthContext();
 
  useEffect(() => {
    const fetchItemTypes = async () => {
      const itemTyperesponse = await fetch('/api/itemTypes');
      const json = await itemTyperesponse.json();

      if (itemTyperesponse.ok) {
        itemTypedispatch({ type: 'SET_ITEMS', payload: json });
      }
    };
    fetchItemTypes();
  }, [itemTypedispatch]);

  return (
    <div>
      <div className="item-list">
        <div className="itemtype-item">
          <Link className="option-type" to="itemTypes" state={{ type: 'All' }}>
            <BsBorderAll />
          </Link>
          All items
        </div>
        {itemTypes &&
          itemTypes.map((itemType, ind) => {
            return (
              <div
                key={ind}
                value={itemType.itemType}
                className="itemtype-item"
              >
                <Link
                  className="option-type"
                  to="itemTypes"
                  state={{
                    type: itemType.itemType,
                  }}
                >
                  <RandomIcon />
                </Link>
                {itemType.itemType}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ItemReturn;
