/*
  React Gallery App.
  Gallery.js
*/

import React from 'react';
import GalleryItem from './Gallery-item';

const Gallery = props => {

    // get data from App.js via props

    const results = props.data;

    // create a gallery item from each image in the JSON, generating a URL for each using template literals

    let images = results.map(image => 
        <GalleryItem key={image.id} url={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}/>
        )

    // conditionally display gallery images, a 'No results found' message, or nothing depending on search results/ link clicked

    let galleryDisplay;
    if(images.length > 0 && props.searchText !== "") {
        galleryDisplay =
        <React.Fragment>
        <h2>Images of {props.name}:</h2>
            <ul>
                {images}
            </ul>
        </React.Fragment>
    } else if(images.length === 0 && document.querySelector('.search-form > input') !== null && document.querySelector('.search-form > input').value !== "") {
        galleryDisplay =
        <React.Fragment>
        <ul>
            <li className="not-found">
                <h3>No Results Found</h3>
                <p>No results were found. Please try something else.</p>
            </li>
        </ul>
        </React.Fragment>
    } else if(document.querySelector('.search-form > input') === null || document.querySelector('.search-form > input').value === "") {
        galleryDisplay = "";
    }

    return(
        <div className="photo-container">
            {galleryDisplay}
        </div>
    )
}

export default Gallery;