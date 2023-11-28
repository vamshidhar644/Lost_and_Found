import { UseAuthContext } from '../auth/useAuthContext';
import {
  UseAllentriesContext,
  UseItemTypesContext,
  UseItemsContext,
} from '../context/useContexts';

import { useNavigate } from 'react-router-dom';

const PostMongo = () => {
  const { dispatch } = UseItemsContext();
  const { Alldispatch } = UseAllentriesContext();
  const { itemTypedispatch } = UseItemTypesContext();
  const navigate = useNavigate();

  const backend_path = process.env.REACT_APP_BACKEND;

  const itemEntry = async (itemDetais, user) => {
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

  const addItemType = async (itemType, user) => {
    const response = await fetch(`${backend_path}/api/itemTypes`, {
      method: 'POST',
      body: JSON.stringify({ itemType }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
      itemTypedispatch({ type: 'CREATE_ITEM', payload: json });
    }
  };

  const itemReturn = async (itemDetais, user) => {
    // console.log(itemDetais, user);
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

      deleteItem(itemDetais._id, user);
      navigate('/items');
    }
  };

  const deleteItem = async (id, user) => {
    const response = await fetch(`${backend_path}/api/items/` + id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_ITEM', payload: json });
    }
  };

  const deleteAllItem = async (id, user) => {
    const response = await fetch(`${backend_path}/api/all_items/` + id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (response.ok) {
      Alldispatch({ type: 'DELETE_ITEM', payload: json });
    }
  };

  const createRequest = async (requestDetails, user) => {
    const response = await fetch(`${backend_path}/api/requests`, {
      method: 'POST',
      body: JSON.stringify(requestDetails),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (!response.ok) {
    }
    if (response.ok) {
      console.log(json);
      navigate('/items');
    }
  };

  const updateStatus = async (id, status, user) => {
    const response = await fetch(`${backend_path}/api/requests/` + id, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (!response.ok) {
    }
    if (response.ok) {
      console.log(json);
    }
  };

  return {
    itemEntry,
    itemReturn,
    deleteItem,
    deleteAllItem,
    createRequest,
    updateStatus,
    addItemType,
  };
};

export default PostMongo;
