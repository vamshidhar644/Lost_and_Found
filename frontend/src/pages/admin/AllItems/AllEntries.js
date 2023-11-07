import React, { useEffect, useState } from 'react';

import './All_Items.css';
import NonAdmin from '../../NonAdmin';

import XLSX from 'xlsx';

const AllEntries = ({ user, items, Allitems }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [AllstartDate, setAllStartDate] = useState('');
  const [AllendDate, setAllEndDate] = useState('');

  function downloadTable() {
    const filteredData = items.filter((row) => {
      const date = new Date(row.date);
      return date >= new Date(startDate) && date <= new Date(endDate);
    });
    const requiredData = filteredData.map(
      ({ imgpath, createdAt, updatedAt, __v, ...rest }) => rest
    );

    const worksheet = XLSX.utils.json_to_sheet(requiredData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Table Data');
    XLSX.writeFile(workbook, 'table.xlsx');
  }

  function downloadAllTable() {
    const filteredData = Allitems.filter((row) => {
      const date = new Date(row.submited_date);
      return date >= new Date(AllstartDate) && date <= new Date(AllendDate);
    });
    const requiredData = filteredData.map(
      ({ imgpath, createdAt, updatedAt, __v, ...rest }) => rest
    );

    const worksheet = XLSX.utils.json_to_sheet(requiredData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Table Data');
    XLSX.writeFile(workbook, 'table.xlsx');
  }

  return (
    <div className="Items-Container">
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
          <div className="Returned-btn" onClick={downloadTable}>
            Download
          </div>
        </div>
      </div>

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
          <div className="Returned-btn" onClick={downloadAllTable}>
            Download
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEntries;
