import React, { useEffect } from 'react';
import fetchMongo from '../../../helpers/fetchMongo';

const Requests = () => {
  const { fetchRequests, requests } = fetchMongo();

  useEffect(() => {
    fetchRequests();
  }, []);

  console.log(requests);
  return <div>Requests</div>;
};

export default Requests;
