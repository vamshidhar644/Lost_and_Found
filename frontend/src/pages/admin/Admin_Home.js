import React from 'react';
import { Link } from 'react-router-dom';
import './Admin_Home.css';

const Admin_Home = () => {
  return (
    <div className="Cards-Container d-flex justify-content-center align-items-center gap-3 p-5">
      <Link className="card" to="/item-entry">
        Item Entry
      </Link>
      <Link className="card" to="/requests">
        Requests
      </Link>
      <Link className="card" to="/items">
        Item Return
      </Link>
      <Link className="card" to="/all-entries">
        All Entries
      </Link>
    </div>
  );
};

export default Admin_Home;
