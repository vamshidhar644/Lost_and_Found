import React, { useState } from 'react';
import DownloadTable from '../../../helpers/downloadTable';
import PostMongo from '../../../helpers/postMongo';

import { MdDelete } from 'react-icons/md';

const NotReturnedItems = ({ items, user }) => {
  const { download } = DownloadTable();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { deleteItem } = PostMongo();

  // console.log(items);

  return (
    <>
      <h4>Not returned items</h4>

      <div className="table-container">
        <table className="styled-table notreturned">
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>Item id </th>
              <th style={{ textAlign: 'center' }}>Item</th>
              <th style={{ textAlign: 'center' }}>Description</th>
              <th style={{ textAlign: 'center' }}>Place found</th>
              <th style={{ textAlign: 'center' }}>Submitted date</th>
              <th style={{ textAlign: 'center' }}>Submitted by</th>
              <th style={{ textAlign: 'center' }}>
                Registration number / Employee id
              </th>
              <th style={{ textAlign: 'center' }}>Phone number</th>
              <th style={{ textAlign: 'center' }}>Delete</th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map((item, ind) => {
                return (
                  <tr key={ind}>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td>{item.place}</td>
                    <td>{item.date}</td>
                    <td>{item.submitedBy}</td>
                    <td>{item.regId}</td>
                    <td>{item.phone}</td>
                    <td
                      onClick={() => deleteItem(item._id, user)}
                      className="delete__btn"
                    >
                      <MdDelete />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <div className="download-section">
          <label>
            From:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            To:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
          <div
            className="Returned-btn"
            onClick={() => download(items, startDate, endDate)}
          >
            Download
          </div>
        </div>
      </div>
    </>
  );
};

export default NotReturnedItems;
