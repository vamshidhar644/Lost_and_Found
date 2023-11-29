import React, { useEffect } from 'react';
import FetchMongo from '../../helpers/fetchMongo';
import './RequestPage.css';

const MyRequests = ({ user }) => {
  const { fetchUserRequests, userReq } = FetchMongo();

  useEffect(() => {
    fetchUserRequests(user);
  }, [user]);

  // console.log(userReq);
  return (
    <div className="requests-grid">
      <h4 className="mb-5 ">My Requests</h4>
      <div className="grid-container">
        {userReq &&
          userReq.map((req) => (
            <div className={`grid-box ${req.status.toLowerCase()}`}>
              <div>
                <div className="mb-2">
                  <strong>Request ID: </strong>
                  {req.req_id}
                </div>
                <div className="mb-2">
                  <strong>Date:</strong> {req.req_date}
                </div>
                <div className="mb-2">
                  <strong>Item ID: </strong>
                  {req.item_id}
                </div>

                <div className="mb-2">
                  <strong>Lost date: </strong>
                  {req.lost_date}
                </div>
                <div className="mb-2">
                  <strong>Description: </strong>
                  {req.req_desc}
                </div>
                <div className="mb-2">
                  <strong>Status: </strong>
                  {req.status}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyRequests;
