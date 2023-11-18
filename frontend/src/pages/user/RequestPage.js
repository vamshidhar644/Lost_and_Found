import React from 'react';
import { useParams } from 'react-router-dom';

const RequestPage = () => {
  const { item_id } = useParams();
  return <div>{item_id}</div>;
};

export default RequestPage;
