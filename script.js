const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded =0;
let totalImages = 0;
let photosArray = [];

// UNSPLASH API
const count = 5;
const apiKey = 'MI57zAW5ahYKYRyVjmrPiDoZp1v0tO_6MrczdedpdeA';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
       
    }
}

// Helper function to set attributes on DOM 
// but ( if you using setAttribute this is not needed i.e what i commented out below)
function setAttributes(element, attributes){
 for(const key in attributes) {
     element.setAttribute(key, attributes[key]);
 }
};
 
//  create Elements for links, photos, add to DOM;
 function displayPhotos () {
     imagesLoaded=0;
     totalImages = photosArray.length;
//  run function for each for each object in photosArray
     photosArray.forEach((photo) => {
        //  create <a> to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html)
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        // create <img>  for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src : photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // add eventlistener, check when each load is finished
        img.addEventListener('load', imageLoaded);
        // put <img> inside <a> and put both inside of imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
     })
 }

// GET PHOTOS FROM UNSPLASH API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
          photosArray = await response.json();
         displayPhotos();
        
    } catch(error) {
        console.log(error, 'there is a problem fetching data');
    }
}

//  INFINTE SCROLL FUNCTIONALITY 
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && ready) {
        ready =false;
        getPhotos();
    }
})

getPhotos();