import React, { useEffect } from 'react';
import ItemDetails from '../Components/ItemDetails';
import ItemForm from '../Components/ItemForm';
import { useItemsContext } from '../hooks/useItemsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
  const { items, dispatch } = useItemsContext();

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
        dispatch({ type: 'SET_ITEMS', payload: json });
      }
    };

    if (user) {
      fetchItem();
    }
  }, [dispatch]);

  return (
    <div className="home">
      <div className="items">
        {items &&
          items.map((item) => <ItemDetails key={item._id} item={item} />)}
      </div>
      <ItemForm />
    </div>
  );
};

export default Home;
