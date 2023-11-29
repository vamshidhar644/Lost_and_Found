import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ItemDetails from './ItemDetails';
import ItemLoader from '../../Components/Loaders/ItemLoader';
import GoToTop from '../../Components/goTop/GoToTop';

import './Items.css';
import FilterItems from '../../helpers/filterItems';

const ItemTypes = ({ user, items }) => {
  const { itemType } = useParams();

  const [c, setC] = useState();
  const { filter, filteredArray } = FilterItems();

  useEffect(() => {
    filter(items, itemType);
    setC(c + 1);
  }, [c]);

  return (
    <div className="items_list__home w-100 h-100">
      <div className="container mt-5">
        <div className="items_list__home">
          <div className="items_list">
            <div className="filter__item">
              <div className="item__count">
                {itemType === 'all-items' ? 'All Items' : itemType}:{' '}
                <strong>{filteredArray.length} items</strong>
              </div>
            </div>

            <div className="item__boxes">
              {filteredArray && filteredArray.length > 0 ? (
                filteredArray.map((item) => (
                  <ItemDetails
                    key={item._id}
                    item={item}
                    user={user}
                    type={itemType}
                  />
                ))
              ) : (
                <div className="alert alert-info">No {itemType} found</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <GoToTop />
    </div>
  );
};

export default ItemTypes;
