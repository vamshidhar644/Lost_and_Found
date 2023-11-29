import React, { useState } from 'react';

import './ItemForm.css';

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
      await itemEntry(itemDetais, user);
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
    <div className="item__entry__container mt-5">
      <form className="item__entry_from">
        <div className="Form-Sections d-flex gap-3">
          <div className="FormBoxes">
            <FetchItemID onId={itemId} />
            <div className="Item-form-Row">
              <label className="mb-0">Item:</label>
              <Suggestions onChange={itemName} user={user} />
            </div>

            <div className="Item-form-Row">
              <label className="mb-0">Description:</label>
              <textarea
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                className="Input-Box form-control"
              ></textarea>
            </div>

            <div className="Item-form-Row">
              <label className="mb-0">Place found:</label>
              <input
                type="text"
                onChange={(e) => setPlace(e.target.value)}
                value={place}
                className="Input-Box form-control"
              />
            </div>

            <div className="Item-form-Row">
              <label className="mb-0">Date:</label>
              <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                className="Input-Box form-control"
              />
            </div>

            <div className="Item-form-Row">
              <label className="mb-0">Submitted by</label>
              <input
                type="text"
                onChange={(e) => setSubmitedBy(e.target.value)}
                value={submitedBy}
                className="Input-Box form-control"
              />
            </div>

            <div className="Item-form-Row">
              <label className="mb-0">Registration number / Employee id:</label>
              <input
                type="text"
                onChange={(e) => setRegId(e.target.value)}
                value={regId}
                className="Input-Box form-control"
              />
            </div>
            <div className="Item-form-Row">
              <label className="mb-0">Phone number</label>
              <input
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                className="Input-Box form-control"
              />
            </div>
          </div>
          <div>
            <Camera onImage={imageName} />
            <div className="Item-form-Row add-btn-container">
              {isLoading ? (
                <AddItemLoader />
              ) : (
                <div
                  className="Returned-btn btn btn-primary"
                  onClick={handleSubmit}
                >
                  Save
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
