import React, { useEffect, useState } from 'react';

const RequestId = () => {
  const [_id, setReqid] = useState('');

  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear() % 100;
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');

  useEffect(() => {
    const _id = `${date}${month}${year}${hours}${minutes}${seconds}`;
    setReqid('RQST' + _id);
  }, [_id]);

  return { _id };
};

export default RequestId;
