import React, { useState, useEffect } from 'react';
import { useItemsContext } from '../hooks/useItemsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useAllentriesContext } from '../hooks/useAllentriesContext';
import '../Styles/ItemForm.css';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';

import NonAdmin from './NonAdmin';
import Suggestions from './Suggestions';

import { AddItemLoader } from '../Loaders/AddItemLoader';
const ItemForm = () => {
  const { items, dispatch } = useItemsContext();
  const { Allitems, Alldispatch } = useAllentriesContext();
  const { user } = useAuthContext();

  const [_id, setItemid] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [place, setPlace] = useState('');
  const [date, setDate] = useState('');
  const [submitedBy, setSubmitedBy] = useState('');
  const [regId, setRegId] = useState('');
  const [phone, setPhone] = useState('');
  const [testImage, setTestImage] = useState([]);
  const [imgpath, setimgpath] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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

    const fetchAllItems = async () => {
      const Allitemresponse = await fetch('/api/all_items', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await Allitemresponse.json();

      if (Allitemresponse.ok) {
        Alldispatch({ type: 'SET_ITEMS', payload: json });
      }
    };

    if (user) {
      adminfetchItem();
      fetchAllItems();
    }

    if (items) {
      if (Allitems) {
        let ItemFullId = items.length + Allitems.length + 1;
        setItemid('SRSITM_' + ItemFullId);
      }
    }
  }, [Alldispatch, Allitems, dispatch, items, user, testImage]);

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
      setEmptyFields(json.emptyFields);
      setIsLoading(false);
    }
    if (response.ok) {
      setName('');
      setDesc('');
      setPlace('');
      setError(null);
      setEmptyFields([]);
      setTestImage('');
      // console.log('new item added', json);
      dispatch({ type: 'CREATE_ITEM', payload: json });
      navigate('/items');
      setIsLoading(false);
    }
  };

  // console.log(imagefile);
  const itemName = (name) => {
    setName(name);
    // console.log(name);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 240,
    };
    try {
      const compressedFile = await imageCompression(file, options);

      const reader = new FileReader();
      reader.onload = () => {
        const binaryData = reader.result;
        // console.log(binaryData);
        setimgpath(binaryData);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.log(error);
    }

    // if (file.size < 49000) {

    // } else {
    //   setTestImage('');
    //   setImageSizeerror('Image size should be < 50KB');
    // }
  };

  if (user) {
    return (
      <div className="form-parent">
        <form className="create">
          <h3>
            Item entry - <span>{_id}</span>
          </h3>
          {error && <div className="error">{error}</div>}

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
            <div className="actions">
              <label
                htmlFor="file"
                className={
                  imgpath ? 'button upload-btn imageExist' : 'button upload-btn'
                }
              >
                Choose file
                {/* {!imgpath && <p>Choose File</p>}
                {imgpath && <p>{testImage}</p>} */}
                <input
                  className="file"
                  hidden=""
                  type="file"
                  id="file"
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={handleFileChange}
                  name="photo"
                />
              </label>
            </div>
            <div className="Item-form-Row add-btn-container">
              {/* <label>
                <button onClick={handleUploadButtonClick}>upload</button>
              </label> */}
              {isLoading ? (
                <AddItemLoader/>
              ) : (
                <div className="Returned-btn" onClick={handleSubmit}>
                  Save
                </div>
              )}
            </div>
          </div>

          <div className="Form-Btn-Container"></div>
        </form>
      </div>
    );
  } else {
    return <NonAdmin />;
  }
};

export default ItemForm;
