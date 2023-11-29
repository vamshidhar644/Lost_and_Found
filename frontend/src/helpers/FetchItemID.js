import React, { useEffect, useState } from 'react';

const FetchItemID = ({ onId }) => {
  const [_id, setItemid] = useState('');

  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear() % 100;
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');

  useEffect(() => {
    const _id = `ITEM +${date}${month}${year}${hours}${minutes}${seconds}`;
    setItemid(_id);

    onId(_id);
  }, [_id]);

  return (
    <h3>
      Item entry - <span>{_id}</span>
    </h3>
  );
};

export default FetchItemID;
