import React, { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useItemsContext } from '../hooks/useItemsContext';
import { useAllentriesContext } from '../hooks/useAllentriesContext';
import '../Styles/All_Items.css';
import NonAdmin from './NonAdmin';

const AllEntries = () => {
  const { items, dispatch } = useItemsContext();
  const { Allitems, Alldispatch } = useAllentriesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const adminfetchItem = async () => {
      const response = await fetch('/api/items', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_ITEMS', payload: json });
      }
    };

    const fetchAllItems = async () => {
      const response = await fetch('/api/all_items', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        Alldispatch({ type: 'SET_ITEMS', payload: json });
      }
    };

    if (user) {
      adminfetchItem();
      fetchAllItems();
    }
  });
  if (user) {
    return (
      <div className="ReturnedItems-Container">
        <h4>Not returned items</h4>
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>Entry </th>
              <th style={{ textAlign: 'center' }}>Item</th>
              <th style={{ textAlign: 'center' }}>Description</th>
              <th style={{ textAlign: 'center' }}>Place found</th>
              <th style={{ textAlign: 'center' }}>Submitted date</th>
              <th style={{ textAlign: 'center' }}>Submitted by</th>
              <th style={{ textAlign: 'center' }}>
                Registration number / Employee id
              </th>
              <th style={{ textAlign: 'center' }}>Phone number</th>
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
        <h4>Returned items</h4>
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>Entry </th>
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
      </div>
    );
  } else {
    return(
      <NonAdmin />
    )
  }
};

export default AllEntries;
