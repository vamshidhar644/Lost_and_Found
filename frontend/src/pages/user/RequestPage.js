import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import RequestId from '../../helpers/RequestId';
import { UseAuthContext } from '../../auth/useAuthContext';
import PostMongo from '../../helpers/postMongo';
import './RequestPage.css';

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
  };

  return (
    <form onSubmit={handleSubmit} className="request__form p-5 m-5">
      <h2>Request Form</h2>
      <div className="d-flex p-4 gap-4">
        <div className="req__form">
          <div className="mb-3">
            <label htmlFor="itemId" className="form-label">
              Item ID:
            </label>
            <p>{item_id}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="requestId" className="form-label">
              Request ID:
            </label>
            <p>{_id}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="requestedDate" className="form-label">
              Requested Date:
            </label>
            <p>{today}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="userEmail" className="form-label">
              User Email:
            </label>
            <p>{user && user.email}</p>
          </div>
        </div>

        <div>
          <div className="mb-3">
            <label htmlFor="regNoEmpId" className="form-label">
              Registration Number / Employee ID:
            </label>
            <input
              type="text"
              className="form-control"
              name="regNo_empId"
              value={formData.regNo_empId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="reqName" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              name="req_name"
              value={formData.req_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lostDate" className="form-label">
              Lost Date:
            </label>
            <input
              type="date"
              className="form-control"
              name="lost_date"
              value={formData.lost_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="reqDesc" className="form-label">
              Description:
            </label>
            <textarea
              className="form-control"
              name="req_desc"
              value={formData.req_desc}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Upload Image:
            </label>
            <input
              type="file"
              className="form-control"
              name="image"
              onChange={handleChange}
              accept="image/*"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default MyForm;
