// import your packages here
import { fetchData } from "./modules/TheDataMiner.js";

(() => {
    // this receives the data payload from our AJAX request, parses it (turns the returned JSON object back into a plain JavaScript object) and renders the data to our view (the markup in index.html)
    function handleDataSet(data) {
        let lightbox = document.querySelector(".lightbox");

        for (let fav in data) { //"in" or "of" 
            let currentFav = favTemplate.cloneNode(true),
                currentFavText = currentFav.querySelector('.fav').children;

            currentFavText[1].src = `images/${data[fav].avatar}`;
            currentFavText[2].textContent = data[fav].name;
            currentFavText[3].textContent = data[fav].type;
            currentFavText[4].textContent = data[fav].history;
            currentFavText[5].textContent = data[fav].reason;

            // add this new user to the view
            favSection.appendChild(currentFav);
        }
    }
    
    function retrieveProjectInfo() {
        // test for an ID
        // check for an id, and if there isn't one, then don't try the fetch call
        // because it'll break (the PHP will choke)
       if (!event.target.id) { return }

        fetchData(`./includes/index.php?id=${event.target.id}`).then(data => console.log(data)).catch(err => console.log(error));
    }

    function renderPortfolioThumbnails(thumbs) {
        let favSection = document.querySelector('.fav-section'),
            favTemplate = document.querySelector('#fav-template').content;

        for (let fav in thumbs) {
            let currentFav = favTemplate.cloneNode(true),
                currentFavText = currentFav.querySelector('.fav').children;

            currentFavText[1].src = `images/${thumbs[fav].avatar}`;
            currentFavText[1].id = thumbs[fav].id;
            currentFavText[2].textContent = thumbs[fav].name;
            currentFavText[3].textContent = thumbs[fav].type;
            currentFavText[4].textContent = thumbs[fav].history;
            currentFavText[5].textContent = thumbs[fav].reason;
            // add this new user to the view
            favSection.appendChild(currentFav);
        }

        favSection.addEventListener("click", retrieveProjectInfo);
    }

    fetchData("./includes/index.php").then(data => renderPortfolioThumbnails(data)).catch(error => console.log(error));
})();

const splash = document.querySelector('.splash');

document.addEventListener('DOMContentLoaded', (e) => {
    setTimeout(()=> {
        splash.classList.add('display-none');
    }, 1000);
})