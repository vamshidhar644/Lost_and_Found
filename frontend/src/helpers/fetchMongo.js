import { useState } from 'react';
import {
  UseAllentriesContext,
  UseItemTypesContext,
  UseItemsContext,
} from '../context/useContexts';
import { UseAuthContext } from '../auth/useAuthContext';

const FetchMongo = () => {
  const { user } = UseAuthContext();
  const { itemTypes, itemTypedispatch } = UseItemTypesContext();
  const { items, dispatch } = UseItemsContext();
  const { Allitems, Alldispatch } = UseAllentriesContext();
  const [requests, setRequests] = useState();

  const backend_path = 'https://lf-backend-aaqr.onrender.com';
  // const backend_path = 'http://localhost:4000';

  const fetchItems = async () => {
    const response = await fetch(`${backend_path}/api/items`);
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'SET_ITEMS', payload: json });
    }
  };

  const fetchAllItems = async (user) => {
    const Allitemresponse = await fetch(`${backend_path}/api/all_items`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await Allitemresponse.json();

    if (Allitemresponse.ok) {
      Alldispatch({ type: 'SET_ITEMS', payload: json });
    }
  };

  const fetchItemTypes = async () => {
    const itemTyperesponse = await fetch(`${backend_path}/api/itemTypes`);

    const json = await itemTyperesponse.json();

    if (itemTyperesponse.ok) {
      itemTypedispatch({ type: 'SET_ITEMS', payload: json });
    }
  };

  const fetchRequests = async () => {
    const Reqresponse = await fetch(`${backend_path}/api/requests`);

    const json = await Reqresponse.json();

    if (Reqresponse.ok) {
      setRequests(json);
    }
  };

  return {
    fetchItemTypes,
    fetchAllItems,
    fetchItems,
    fetchRequests,
    items,
    Allitems,
    itemTypes,
    requests,
  };
};

export default FetchMongo;
