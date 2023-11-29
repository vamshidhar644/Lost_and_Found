import React, { useEffect, useState } from 'react';

const RequestDetails = ({ handleStatusChange, req, setOpen }) => {
  const [imgSrc, setImageSrc] = useState();

  useEffect(() => {
    if (req.image) {
      const img = new Image();
      img.src = `${req.image}`;

      setImageSrc(img.src);
    }
  }, [req.image]);
  return (
    <div>
      <div className="overlay" id="overlay">
        <div className="popup">
          <span className="close-btn" onClick={() => setOpen(null)}>
            &times;
          </span>
          <h2>Request Details</h2>

          <div className="d-flex gap-4">
            <div>
              <div className="mb-2">
                <strong>Request ID: </strong>
                {req.req_id}
              </div>
              <div className="mb-2">
                <strong>Date:</strong> {req.req_date}
              </div>
              <div className="mb-2">
                <strong>Item ID: </strong>
                {req.item_id}
              </div>
              <div className="mb-2">
                <strong>Email: </strong>
                {req.req_email}
              </div>
              <div className="mb-2">
                <strong>Reg No/Emp Id: </strong>
                {req.regNo_empId}
              </div>
              <div className="mb-2">
                <strong>Name: </strong>
                {req.req_name}
              </div>
              <div className="mb-2">
                <strong>Lost date: </strong>
                {req.lost_date}
              </div>
              <div className="mb-2">
                <strong>Description: </strong>
                {req.req_desc}
              </div>

              <div>
                <strong>Change Status:</strong>
                <select
                  onChange={(e) =>
                    handleStatusChange(req.req_id, e.target.value)
                  }
                  defaultValue={req.status}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            <div className="req_image">
              <img src={imgSrc} alt="not uploaded" className="w-100 h-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
