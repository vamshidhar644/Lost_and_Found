import React, { useState } from 'react';

import { useAuthContext } from '../../../auth/useAuthContext';
import { useItemsContext } from '../../../hooks/useItemsContext';

import './ItemForm.css';
import { useNavigate } from 'react-router-dom';

import NonAdmin from '../../NonAdmin';
import Suggestions from '../../../Components/suggestions/Suggestions';
import { AddItemLoader } from '../../../Components/Loaders/AddItemLoader';
import Camera from '../../../Components/camera/CaptureCamera';
import FetchItemID from '../../../helpers/FetchItemID';

const ItemForm = () => {
  const { dispatch } = useItemsContext();
  const { user } = useAuthContext();

  const [_id, setItemid] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [place, setPlace] = useState('');
  const [date, setDate] = useState('');
  const [submitedBy, setSubmitedBy] = useState('');
  const [regId, setRegId] = useState('');
  const [phone, setPhone] = useState('');
  const [imgpath, setimgpath] = useState('');

  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const itemDetais = {
      _id,
      name,
      desc,
      place,
      date,
      submitedBy,
      regId,
      phone,
      imgpath,
    };

    const response = await fetch('/api/items', {
      method: 'POST',
      body: JSON.stringify(itemDetais),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      // setEmptyFields(json.emptyFields);
      setIsLoading(false);
    }
    if (response.ok) {
      setName('');
      setDesc('');
      setPlace('');
      setError(null);

      dispatch({ type: 'CREATE_ITEM', payload: json });
      navigate('/items');
      setIsLoading(false);
    }
  };

  // console.log(imagefile);
  const itemName = (name) => {
    setName(name);
  };

  const imageName = (imageName) => {
    setimgpath(imageName);
  };

  const itemId = (itemId) => {
    setItemid(itemId);
  };

  if (user) {
    return (
      <div className="form-parent">
        <form className="create">
          <FetchItemID onId={itemId} />
          {error && <div className="error">{error}</div>}
          <div className="Form-Sections">
            <div className="FormBoxes">
              <div className="Item-form-Row">
                <label>Item:</label>
                <Suggestions onChange={itemName} />
              </div>

              <div className="Item-form-Row">
                <label>Description:</label>
                <textarea
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                  className="Input-Box"
                ></textarea>
              </div>

              <div className="Item-form-Row">
                <label>Place found:</label>
                <input
                  type="text"
                  onChange={(e) => setPlace(e.target.value)}
                  value={place}
                  className="Input-Box"
                />
              </div>

              <div className="Item-form-Row">
                <label>Date:</label>
                <input
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  className="Input-Box"
                />
              </div>

              <div className="Item-form-Row">
                <label>Submitted by</label>
                <input
                  type="text"
                  onChange={(e) => setSubmitedBy(e.target.value)}
                  value={submitedBy}
                  className="Input-Box"
                />
              </div>

              <div className="Item-form-Row">
                <label>Registration number / Employee id:</label>
                <input
                  type="text"
                  onChange={(e) => setRegId(e.target.value)}
                  value={regId}
                  className="Input-Box"
                />
              </div>
              <div className="Item-form-Row">
                <label>Phone number</label>
                <input
                  type="text"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  className="Input-Box"
                />
              </div>

              <div className="Item-form-Row add-btn-container">
                {isLoading ? (
                  <AddItemLoader />
                ) : (
                  <div className="Returned-btn" onClick={handleSubmit}>
                    Save
                  </div>
                )}
              </div>
            </div>
            <Camera onImage={imageName} />
          </div>
        </form>
      </div>
    );
  } else {
    return <NonAdmin />;
  }
};

export default ItemForm;
