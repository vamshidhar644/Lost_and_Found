import React from 'react';

import { Link } from 'react-router-dom';
import { BsBorderAll } from 'react-icons/bs';

import './Items.css';

const Items = ({ itemTypes }) => {
  const getFirstLetters = (str) => {
    return str
      .split(' ')
      .filter((word) => word.length > 0)
      .map((word) => word[0])
      .join('');
  };
  // console.log(itemTypes);
  return (
    <div className="itemList__container d-flex align-items-center mt-5">
      <div className="item__list p-5">
        <Link className="itemtype__item" to="/items/all-items">
          <p className="m-0">AI</p>
          <span>All items</span>
        </Link>
        {itemTypes ? (
          itemTypes.map((itemType, ind) => {
            return (
              <Link
                to={`/items/${itemType.itemType}`}
                key={ind}
                value={itemType.itemType}
                className="itemtype__item"
              >
                <p className="m-0">{getFirstLetters(itemType.itemType)}</p>
                <span>{itemType.itemType}</span>
              </Link>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Items;
