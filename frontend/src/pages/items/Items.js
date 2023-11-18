import React from 'react';

import { Link } from 'react-router-dom';
import { BsBorderAll } from 'react-icons/bs';

import RandomIcon from '../../Components/shapeGenerators/ShapeGenerator';
import './Items.css';

const Items = ({ itemTypes }) => {
  // console.log(itemTypes);
  return (
    <div className="itemList-Container">
      <div className="item-list">
        <div className="itemtype-item">
          <Link className="option-type" to="All Items">
            <BsBorderAll />
          </Link>
          All items
        </div>
        {itemTypes ? (
          itemTypes.map((itemType, ind) => {
            return (
              <div
                key={ind}
                value={itemType.itemType}
                className="itemtype-item"
              >
                <Link
                  className="option-type"
                  to={`/items/${itemType.itemType}`}
                >
                  <RandomIcon />
                </Link>
                {itemType.itemType}
              </div>
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
