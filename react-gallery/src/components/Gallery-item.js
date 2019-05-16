/*
  React Gallery App.
  Gallery-item.js
*/

import React from 'react';

const GalleryItem = (props) =>
    <li>
        <img src={props.url} alt="" />
    </li>

export default GalleryItem;