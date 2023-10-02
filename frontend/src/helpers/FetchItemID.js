import React, { useEffect, useState } from 'react';

const FetchItemID = ({ onId, items, Allitems }) => {
  const [_id, setItemid] = useState('');

  useEffect(() => {
    if (items && Allitems) {
      let ItemFullId = items.length + Allitems.length + 1;
      setItemid('SRSITM_' + ItemFullId);
    }

    onId(_id);
  }, [_id]);

  return (
    <h3>
      Item entry - <span>{_id}</span>
    </h3>
  );
};

export default FetchItemID;
