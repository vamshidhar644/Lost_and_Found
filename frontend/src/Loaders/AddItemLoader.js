import React from 'react';
import '../Styles/Loaders.css';

export const AddItemLoader = () => {
  return (
    <>
      <div class="loadingspinner">
        <div id="square1"></div>
        <div id="square2"></div>
        <div id="square3"></div>
        <div id="square4"></div>
        <div id="square5"></div>
      </div>
      <p>Processing...</p>
    </>
  );
};
