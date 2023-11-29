import React, { useEffect, useRef } from 'react';

import { BsCameraFill } from 'react-icons/bs';
import { IoMdReverseCamera, IoMdSave } from 'react-icons/io';

import './CaptureCamera.css';
import CaptureCamera from '../../helpers/captureCamera';

const Camera = ({ onImage }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const {
    stream,
    setStream,
    imageSrc,
    captureImage,
    RecaptureImage,
    SaveImage,
  } = CaptureCamera();

  const inputRef = useRef(null);

  useEffect(() => {
    const enableStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(stream);
      } catch (error) {
        console.error(error);
      }
    };

    enableStream();
  }, []);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  }, [stream]);

  const ImageCapture = () => {
    captureImage(canvasRef, videoRef);
  };

  const ReImageCapture = () => {
    RecaptureImage();
  };

  const Save_Image = () => {
    SaveImage({ onImage });
  };

  return (
    <div className="camera__section">
      <div className=" p-4">
        {imageSrc && (
          <img
            src={imageSrc}
            ref={inputRef}
            className="img-fluid rounded"
            style={{ transform: 'scaleX(-1)', filter: 'FlipH' }}
            alt=""
          />
        )}
        {!imageSrc && (
          <video
            ref={videoRef}
            className="img-fluid rounded"
            style={{ transform: 'scaleX(-1)', filter: 'FlipH' }}
          />
        )}
        <div className="camera-btn-section mt-3">
          {!imageSrc && (
            <div className="all-buttons">
              <button
                onClick={ImageCapture}
                className="btn btn-primary Camera-btn"
              >
                <BsCameraFill /> Capture Image
              </button>
            </div>
          )}
          {imageSrc && (
            <div className="all-buttons">
              <div
                onClick={ReImageCapture}
                className="btn btn-secondary Camera-btn d-flex align-items-center gap-1"
              >
                <IoMdReverseCamera /> Recapture
              </div>
              <div
                onClick={Save_Image}
                className="btn btn-success Camera-btn  d-flex align-items-center gap-1"
              >
                <IoMdSave />
                Save
              </div>
            </div>
          )}
        </div>
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default Camera;
