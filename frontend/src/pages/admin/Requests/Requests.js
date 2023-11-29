import React, { useEffect, useState } from 'react';
import fetchMongo from '../../../helpers/fetchMongo';
import './Requests.css'
import PostMongo from '../../../helpers/postMongo';
import RequestDetails from './RequestDetails';

const Requests = ({ user }) => {
  const { fetchRequests, requests } = fetchMongo();

  useEffect(() => {
    fetchRequests();
  }, []);

  const { updateStatus } = PostMongo();
  const [statusFilter, setStatusFilter] = useState('all');
  const [clickedRequest, setClickedRequest] = useState(null);

  const handleStatusChange = async (reqId, newStatus) => {
    // Implement your logic to update the status in the state or make an API call
    await updateStatus(reqId, newStatus, user);
  };

  const filteredRequests =
    requests &&
    requests.filter((req) => {
      const statusMatch = statusFilter === 'all' || req.status === statusFilter;

      return statusMatch;
    });

  // console.log(requests);
  return (
    <div className="requests-grid">
      <div className="filters">
        <label>
          Status:{' '}
          <select onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>
      </div>
      <div className="grid-container">
        {filteredRequests &&
          filteredRequests.map((req) => (
            <div
              key={req.req_id}
              className={`grid-box ${req.status.toLowerCase()}`}
            >
              <div>Request ID: {req.req_id}</div>
              <div>Date: {req.req_date}</div>
              <div>Item ID: {req.item_id}</div>
              <div>Status: {req.status}</div>

              <div
                className="open__button mt-2"
                onClick={() => setClickedRequest(req)}
              >
                Open Request
              </div>
              {clickedRequest && (
                <RequestDetails
                  req={clickedRequest}
                  setOpen={() => setClickedRequest(null)}
                  handleStatusChange={handleStatusChange}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Requests;
