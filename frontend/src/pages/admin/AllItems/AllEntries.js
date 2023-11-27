import React from 'react';

import './All_Items.css';
import NotReturnedItems from './NotReturnedItems';
import ReturnedItems from './ReturnedItems';

const AllEntries = ({ items, Allitems, user }) => {
  return (
    <div className="Items-Container">
      <NotReturnedItems items={items} user={user} />

      <ReturnedItems Allitems={Allitems} user={user} />
    </div>
  );
};

export default AllEntries;
