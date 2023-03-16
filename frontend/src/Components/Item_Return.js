import React, {
  useEffect,
  //  useState
} from 'react';
import ItemDetails from './ItemDetails';
import { useItemsContext } from '../hooks/useItemsContext';
import { useAuthContext } from '../hooks/useAuthContext';

import 'react-datepicker/dist/react-datepicker.css';

const Item_Return = () => {
  const { items, dispatch } = useItemsContext();

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

    const fetchItems = async () => {
      const response = await fetch('/api/items');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_ITEMS', payload: json });
      }
    };

    if (user) {
      adminfetchItem();
    } else {
      fetchItems();
    }
  });

  return (
    <div className="home">
      <div className="items">
        {items &&
          items.map((item) => <ItemDetails key={item._id} item={item} />)}
      </div>
      {/* {user && <ItemForm />} */}
    </div>
  );
};

export default Item_Return;
