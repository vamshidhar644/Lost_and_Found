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

  console.log(filteredArray);

  return (
    <div className="home">
      <div className="items">
        <div className="filter-items">
          <div className="itemCount">
            {itemType}: {filteredArray.length} items
          </div>
        </div>

        <div className="all-items">
          {filteredArray ? (
            filteredArray.map((item) => {
              return <ItemDetails key={item._id} item={item} user={user} />;
            })
          ) : <ItemLoader /> ? (
            <div>No {itemType} found</div>
          ) : (
            <></>
          )}   
        </div>
      </div> 
      <GoToTop /> 
    </div>
  );
};

export default ItemTypes;
