import React, { useEffect, useState } from 'react';
import ItemDetails from '../Components/ItemDetails';
import ItemForm from '../Components/ItemForm';
import { useItemsContext } from '../hooks/useItemsContext';
import { useAuthContext } from '../hooks/useAuthContext';

import 'react-datepicker/dist/react-datepicker.css';

const Home = () => {
  const { items, dispatch } = useItemsContext();
  const [item, setItem] = useState(null);

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchItem = async () => {
      const response = await fetch('/api/items', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setItem(json);
        dispatch({ type: 'SET_ITEMS', payload: json });
      }
    }; 

    if (user) {
      fetchItem();
    }
    fetchItem();
  }, []);

  return (
    <div className="home">
      <div className="items">
        {items &&
          items.map((item) => <ItemDetails key={item._id} item={item} />)}
      </div>
      {user && <ItemForm />}
    </div>
  );
};

export default Home;
