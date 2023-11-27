import React, { useEffect, useRef, useState } from 'react';

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
    <div className="Camera">
      {imageSrc && (
        <img
          src={imageSrc}
          ref={inputRef}
          style={{ transform: 'scaleX(-1)', filter: 'FlipH' }}
          alt=""
        />
      )}
      {!imageSrc && (
        <video
          ref={videoRef}
          style={{ transform: 'scaleX(-1)', filter: 'FlipH' }}
        />
      )}
      <div className="camera-btn-section">
        {!imageSrc && (
          <div className="all-buttons">
            <div onClick={ImageCapture} className="Camera-btn">
              <BsCameraFill />
            </div>
          </div>
        )}
        {imageSrc && (
          <div className="all-buttons">
            <div onClick={ReImageCapture} className="Camera-btn">
              <IoMdReverseCamera /> Recapture
            </div>
            <div onClick={Save_Image} className="Camera-btn">
              <IoMdSave /> Save
            </div>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default Camera;
