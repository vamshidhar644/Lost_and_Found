import React, { useState } from 'react';

import './ItemForm.css';

import NonAdmin from '../../NonAdmin';
import Suggestions from '../../../Components/suggestions/Suggestions';
import { AddItemLoader } from '../../../Components/Loaders/AddItemLoader';
import Camera from '../../../Components/camera/CaptureCamera';
import FetchItemID from '../../../helpers/FetchItemID';
import PostMongo from '../../../helpers/postMongo';

const ItemForm = ({ user }) => {
  const { itemEntry } = PostMongo();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);

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

    console.log(itemDetais);
    if (
      _id === '' ||
      name === '' ||
      desc === '' ||
      place === '' ||
      date === '' ||
      submitedBy === '' ||
      regId === '' ||
      phone === '' ||
      imgpath === ''
    ) {
      setError('Please fill all the fields');
    } else {
      itemEntry(itemDetais);
      setIsLoading(true);
    }
  };

  const itemName = (name) => {
    setName(name);
  };

  const imageName = (imageName) => {
    setimgpath(imageName);
  };

  const itemId = (itemId) => {
    setItemid(itemId);
  };

  return (
    <div className="form-parent">
      <form className="create">
        <FetchItemID onId={itemId} />
        {error && <div className="error">{error}</div>}
        <div className="Form-Sections">
          <div className="FormBoxes">
            <div className="Item-form-Row">
              <label>Item:</label>
              <Suggestions onChange={itemName} user={user} />
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
};

export default ItemForm;
