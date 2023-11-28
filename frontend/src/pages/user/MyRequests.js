import React, { useEffect } from 'react';
import FetchMongo from '../../helpers/fetchMongo';

const MyRequests = ({ user }) => {
  const { fetchUserRequests, userReq } = FetchMongo();

  useEffect(() => {
    fetchUserRequests(user);
  }, [user]);

  // console.log(userReq);
  return (
    <div className="grid-container">
      {userReq ? (
        userReq.map((req) => (
          <div key={req.req_id} className="grid-box">
            <div>Request ID: {req.req_id}</div>
            <div>Date: {req.req_date}</div>
            <div>Item ID: {req.item_id}</div>
            {/* Add other request details as needed */}
            <div>Status: {req.status}</div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyRequests;
