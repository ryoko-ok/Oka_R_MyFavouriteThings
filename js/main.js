// import your packages here
import { fetchData } from "./modules/TheDataMiner.js";

(() => {
    // stub * just a place for non-component-specific stuff
    console.log('loaded');
    
    function popErrorBox(message) {
        alert("Something has gone horribly, horribly wrong");
    }

    // this receives the data payload from our AJAX request, parses it (turns the returned JSON object back into a plain JavaScript object) and renders the data to our view (the markup in index.html)
    function handleDataSet(data) {
        let favouriteSection = document.querySelector('.favourite-section'),
            favouriteTemplate = document.querySelector('#favourite-template').content;

        for (let favourite in data) {
            debugger;
            let currentFavourite = favouriteTemplate.cloneNode(true),
                currentFavouriteText = currentFavourite.querySelector('.favourite').children;

            currentFavouriteText[1].src = `images/${data[favourite].Avatar}`;
            currentFavouriteText[2].textContent = data[favourite].Name;
            currentFavouriteText[3].textContent = data[favourite].Type;
            currentFavouriteText[4].textContent = data[favourite].History;
            currentFavouriteText[5].textContent = data[favourite].Reason;

            // add this new user to the view
            favouriteSection.appendChild(currentFavourite);
        }
    }

    // Click function 
    
    function retrieveProjectInfo() {
        // test for an ID
        // check for an id, and if there isn't one, then don't try the fetch call
        // because it'll break (the PHP will choke)
        if (!event.target.id) { return }

        fetchData(`./includes/index.php?id=${event.target.id}`).then(data => console.log(data)).catch(err => console.log(err));
    }

    function renderPortfolioThumbnails(thumbs) {
        let favouriteSection = document.querySelector('.favourite-section'),
            favouriteTemplate = document.querySelector('#favourite-template').content;

        for (let favourite in thumbs) {
            let currentFavourite = favouriteTemplate.cloneNode(true),
                currentFavouriteText = currentFavourite.querySelector('.favourite').children;

            currentFavouriteText[1].src = `images/${thumbs[favourite].Avatar}`;
            currentFavouriteText[1].id = thumbs[favourite].ID;
            // add this new user to the view
            favouriteSection.appendChild(currentFavourite);
        }

        favouriteSection.addEventListener("click", retrieveProjectInfo);
    }
        
    fetchData("./includes/index.php").then(data => renderPortfolioThumbnails(data[0])).catch(err => console.log(err));
})();