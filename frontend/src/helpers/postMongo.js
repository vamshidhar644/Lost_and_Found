import { UseAuthContext } from '../auth/useAuthContext';
import { UseAllentriesContext, UseItemsContext } from '../context/useContexts';

import { useNavigate } from 'react-router-dom';

const PostMongo = () => {
  const { dispatch } = UseItemsContext();
  const { Alldispatch } = UseAllentriesContext();
  const navigate = useNavigate();

  const { user } = UseAuthContext(0);

  // const backend_path = 'https://lf-backend-aaqr.onrender.com';
  const backend_path = 'localhost:4000';

  const itemEntry = async (itemDetais) => {
    const response = await fetch(`${backend_path}/api/items`, {
      method: 'POST',
      body: JSON.stringify(itemDetais),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (!response.ok) {
    }
    if (response.ok) {
      dispatch({ type: 'CREATE_ITEM', payload: json });
      navigate('/items');
    }
  };

  const itemReturn = async (itemDetais) => {
    const Addresponse = await fetch(`${backend_path}/api/all_items`, {
      method: 'POST',
      body: JSON.stringify(itemDetais),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const Addjson = await Addresponse.json();
    if (!Addresponse.ok) {
    }

    if (Addresponse.ok) {
      Alldispatch({ type: 'CREATE_ITEM', payload: Addjson });

      const response = await fetch('/api/items/' + itemDetais._id, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: 'DELETE_ITEM', payload: json });
      }
      navigate('/items');
    }
  };

  return { itemEntry, itemReturn };
};

export default PostMongo;
