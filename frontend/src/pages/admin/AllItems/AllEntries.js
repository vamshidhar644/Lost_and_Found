import React from 'react';

import './All_Items.css';
import NotReturnedItems from './NotReturnedItems';
import ReturnedItems from './ReturnedItems';

const AllEntries = ({ items, Allitems }) => {
  return (
    <div className="Items-Container">
      <NotReturnedItems items={items} />

      <ReturnedItems Allitems={Allitems} />
    </div>
  );
};

export default AllEntries;
