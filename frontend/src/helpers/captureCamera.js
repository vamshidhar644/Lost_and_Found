import { useEffect, useState } from 'react';

import imageCompression from 'browser-image-compression';

const CaptureCamera = () => {
  const [stream, setStream] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

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

    // Cleanup function to disable the stream when the component is unmounted
    return () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const captureImage = (canvasRef, videoRef) => {
    // e.preventDefault();
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

  const RecaptureImage = () => {
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

  const SaveImage = async ({ onImage }) => {
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

  return {
    captureImage,
    RecaptureImage,
    SaveImage,
    stream,
    setStream,
    imageSrc,
    setImageSrc,
  };
};

export default CaptureCamera;
