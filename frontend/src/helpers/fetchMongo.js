import { UseAuthContext } from '../auth/useAuthContext';
import {
  UseAllentriesContext,
  UseItemTypesContext,
  UseItemsContext,
} from '../context/useContexts';

const fetchMongo = () => {
  const { user } = UseAuthContext();
  const { itemTypes, itemTypedispatch } = UseItemTypesContext();
  const { items, dispatch } = UseItemsContext();
  const { Allitems, Alldispatch } = UseAllentriesContext();

  // const backend_path = 'https://lf-backend-aaqr.onrender.com';
  const backend_path = 'http://localhost:4000'

  const fetchItems = async () => {
    const response = await fetch(`${backend_path}/api/items`);
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'SET_ITEMS', payload: json });
    }
  };

  const fetchAllItems = async () => {
    const Allitemresponse = await fetch(`${backend_path}/api/all_items`, {
      // headers: {
      //   Authorization: `Bearer ${user.token}`,
      // },
    });
    const json = await Allitemresponse.json();

    if (Allitemresponse.ok) {
      Alldispatch({ type: 'SET_ITEMS', payload: json });
    }
  };

  const fetchItemTypes = async () => {
    const itemTyperesponse = await fetch(`${backend_path}/api/itemTypes`);
    //  {
    // headers: {
    //   Authorization: `Bearer ${user.token}`,
    // },
    // });
    const json = await itemTyperesponse.json();

    if (itemTyperesponse.ok) {
      itemTypedispatch({ type: 'SET_ITEMS', payload: json });
    }
  };

  return {
    fetchItemTypes,
    fetchAllItems,
    fetchItems,
    items,
    Allitems,
    itemTypes,
  };
};

export default fetchMongo;
