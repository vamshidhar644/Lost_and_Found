import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import RequestId from '../../helpers/RequestId';
import { UseAuthContext } from '../../auth/useAuthContext';
import PostMongo from '../../helpers/postMongo';

const MyForm = () => {
  const { user } = UseAuthContext();
  const { item_id } = useParams();
  const { _id } = RequestId();
  const today = new Date().toISOString().split('T')[0];
 
  const { createRequest } = PostMongo();

  const [formData, setFormData] = useState({
    regNo_empId: '',
    req_name: '',
    lost_date: '',
    req_desc: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const compressAndConvertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;

        image.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Set canvas dimensions to the image dimensions
          canvas.width = image.width;
          canvas.height = image.height;

          // Draw the image onto the canvas
          ctx.drawImage(image, 0, 0);

          // Get the data URL from the canvas
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedDataUrl);
        };

        image.onerror = (error) => reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Compress and convert image to base64
    const compressedImage = await compressAndConvertToBase64(formData.image);

    // Update form data with the compressed image
    setFormData((prevData) => ({
      ...prevData,
      image: compressedImage,
    }));

    e.preventDefault();

    const requestDetails = {
      req_id: _id,
      req_date: today,
      item_id: item_id,
      req_email: user.email,
      regNo_empId: formData.regNo_empId,
      req_name: formData.req_name,
      lost_date: formData.lost_date,
      req_desc: formData.req_desc,
      image: compressedImage,
    };

    createRequest(requestDetails, user);

    // console.log('Form Data:', requestDetails);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Item id: {item_id}</p>
      <p>Request id: {_id}</p>
      <p>Requested date: {today}</p>
      <p>{user && user.email}</p>

      <div>
        <label>Registration Number / Employee ID:</label>
        <input
          type="text"
          name="regNo_empId"
          value={formData.regNo_empId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="req_name"
          value={formData.req_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Lost Date:</label>
        <input
          type="date"
          name="lost_date"
          value={formData.lost_date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="req_desc"
          value={formData.req_desc}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          // required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
