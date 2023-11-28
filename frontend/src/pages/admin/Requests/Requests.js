import React, { useEffect } from 'react';
import fetchMongo from '../../../helpers/fetchMongo';
import RequestsGrid from './RequestGrid';

const Requests = ({ user }) => {
  const { fetchRequests, requests } = fetchMongo();

  useEffect(() => {
    fetchRequests();
  }, []);

  // console.log(requests);
  return <RequestsGrid requests={requests} user={user} />;
};

export default Requests;
