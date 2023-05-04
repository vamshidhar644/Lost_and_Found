import React, { useEffect, useRef, useState } from 'react';

import { BsCameraFill } from 'react-icons/bs';
import { IoMdReverseCamera, IoMdSave } from 'react-icons/io';

import imageCompression from 'browser-image-compression';
import '../Styles/CaptureCamera.css'

const Camera = ({ onImage }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

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

  const captureImage = (e) => {
    e.preventDefault();
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL();
      setImageSrc(dataURL);
    }

    // Turn off the camera stream
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    setStream(null);
  };

  const RecaptureImage = (e) => {
    e.preventDefault();
    setImageSrc(null);

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
  };

  const SaveImage = async (e) => {
    e.preventDefault();

    const blob = dataURLtoBlob(imageSrc);

    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 240,
    };

    try {
      const compressedFile = await imageCompression(blob, options);

      const reader = new FileReader();
      reader.onload = () => {
        const binaryData = reader.result;
        // console.log(binaryData);
        onImage(binaryData);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.log(error);
    }
  };

  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
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
            <div onClick={captureImage} className="Camera-btn">
              <BsCameraFill />
            </div>
          </div>
        )}
        {imageSrc && (
          <div className="all-buttons">
            <div onClick={RecaptureImage} className="Camera-btn">
              <IoMdReverseCamera />
            </div>
            <div onClick={SaveImage} className="Camera-btn">
              <IoMdSave />
            </div>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default Camera;
