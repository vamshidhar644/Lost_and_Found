import React, { useEffect, useState } from 'react';

import { useItemsContext } from '../hooks/useItemsContext';
import { useAuthContext } from '../auth/useAuthContext';
import { useAllentriesContext } from '../hooks/useAllentriesContext';

const FetchItemID = ({ onId }) => {
  const { items, dispatch } = useItemsContext();
  const { Allitems, Alldispatch } = useAllentriesContext();
  const { user } = useAuthContext();

  const [_id, setItemid] = useState('');

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
      const Allitemresponse = await fetch('/api/all_items', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await Allitemresponse.json();

      if (Allitemresponse.ok) {
        Alldispatch({ type: 'SET_ITEMS', payload: json });
      }
    };

    if (user) {
      adminfetchItem();
      fetchAllItems();
    }

    if (items) {
      if (Allitems) {
        let ItemFullId = items.length + Allitems.length + 1;
        setItemid('SRSITM_' + ItemFullId);
      }
    }

    onId(_id);
  }, [Alldispatch, Allitems, dispatch, items, user]);
  return (
    <h3>
      Item entry - <span>{_id}</span>
    </h3>
  );
};

export default FetchItemID;
