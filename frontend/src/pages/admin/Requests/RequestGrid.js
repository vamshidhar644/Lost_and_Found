// RequestsGrid.js

import React, { useState } from 'react';
import './Requests.css';
import PostMongo from '../../../helpers/postMongo';

const RequestsGrid = ({ requests, user }) => {
  const { updateStatus } = PostMongo();
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  const handleStatusChange = async (reqId, newStatus) => {
    // Implement your logic to update the status in the state or make an API call
    // await updateStatus(reqId, newStatus, user);
  };

  const filteredRequests =
    requests &&
    requests.filter((req) => {
      const statusMatch = statusFilter === 'all' || req.status === statusFilter;
      const dateMatch = !dateFilter || req.req_date.includes(dateFilter);
      return statusMatch && dateMatch;
    });

  return (
    <div className="requests-grid">
      <div className="filters">
        <label>
          Status:
          <select onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>
        <label>
          Date:
          <input
            type="text"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            placeholder="YYYY-MM-DD"
          />
        </label>
      </div>
      <div className="grid-container">
        {filteredRequests &&
          filteredRequests.map((req) => (
            <div key={req.req_id} className="grid-box">
              <div>Request ID: {req.req_id}</div>
              <div>Date: {req.req_date}</div>
              <div>Item ID: {req.item_id}</div>
              {/* Add other request details as needed */}
              <div>Status: {req.status}</div>
              <div>
                Change Status:
                <select
                  onChange={(e) =>
                    handleStatusChange(req.req_id, e.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RequestsGrid;
