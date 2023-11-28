import React, { useState } from 'react';
import DownloadTable from '../../../helpers/downloadTable';
import PostMongo from '../../../helpers/postMongo';
import { MdDelete } from 'react-icons/md';

const ReturnedItems = ({ Allitems, user }) => {
  const { download } = DownloadTable();

  const { deleteAllItem } = PostMongo();

  const [AllstartDate, setAllStartDate] = useState('');
  const [AllendDate, setAllEndDate] = useState('');

  return (
    <>
      <h4>Returned items</h4>
      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>Item id </th>
              <th style={{ textAlign: 'center' }}>Item</th>
              <th style={{ textAlign: 'center' }}>Description</th>
              <th style={{ textAlign: 'center' }}>Place found</th>
              <th style={{ textAlign: 'center' }}>Submitted date</th>
              <th style={{ textAlign: 'center' }}>Submitted by</th>
              <th style={{ textAlign: 'center' }}>
                Registration number/Employee id (Submitted)
              </th>
              <th style={{ textAlign: 'center' }}>Phone number (submitted)</th>
              <th style={{ textAlign: 'center' }}>Recieved date</th>
              <th style={{ textAlign: 'center' }}>Recieved by</th>
              <th style={{ textAlign: 'center' }}>
                Registration number/Employee id (Recieved)
              </th>
              <th style={{ textAlign: 'center' }}>Phone number (Recieved)</th>
              <th style={{ textAlign: 'center' }}>Father Phone</th>
              <th style={{ textAlign: 'center' }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Allitems &&
              Allitems.map((item, ind) => (
                <tr key={ind}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.desc}</td>
                  <td>{item.place_found}</td>
                  <td>{item.submited_date}</td> 
                  <td>{item.submitedBy_Name}</td>
                  <td>{item.submitedBy_regId}</td>
                  <td>{item.submitedBy_phone}</td>
                  <td>{item.recieved_date}</td>
                  <td>{item.recievedBy_Name}</td>
                  <td>{item.recievedBy_regId}</td>
                  <td>{item.recievedBy_phone}</td>
                  <td>{item.father_phone}</td>
                  <td
                    onClick={() => deleteAllItem(item._id, user)}
                    className="delete__btn"
                  >
                    <MdDelete />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="download-section">
          <label>
            From:
            <input
              type="date"
              value={AllstartDate}
              onChange={(e) => setAllStartDate(e.target.value)}
            />
          </label>
          <label>
            To:
            <input
              type="date"
              value={AllendDate}
              onChange={(e) => setAllEndDate(e.target.value)}
            />
          </label>
          <div
            className="Returned-btn"
            onClick={() => download(Allitems, AllstartDate, AllendDate)}
          >
            Download
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnedItems;
