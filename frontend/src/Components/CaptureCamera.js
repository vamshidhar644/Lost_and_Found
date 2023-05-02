import React, { useEffect, useRef, useState } from 'react';

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
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
  };

  return (
    <div>
      {imageSrc && <img src={imageSrc} />}
      {!imageSrc && <video ref={videoRef} />}
      <div onClick={captureImage}>Capture Image</div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default Camera;
