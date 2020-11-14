// import your packages here
import { fetchData } from "./modules/TheDataMiner.js";

(() => {
    // this receives the data payload from our AJAX request, parses it (turns the returned JSON object back into a plain JavaScript object) and renders the data to our view (the markup in index.html)
    function handleDataSet(data) {
        let favSection = document.querySelector('.fav-section'),
            favTemplate = document.querySelector('#fav-template').content;
            debugger;

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
        debugger;
        console.log(this.id);
        fetchData(`./includes/index.php?id=${this.id}`).then(data => console.log(data)).catch(err => console.log(error));
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

            // add this new user to the view

            currentFav.addEventListener("click", retrieveProjectInfo);
            favSection.appendChild(currentFav);

            // function retrieveProjectInfo(){
            //     currentFavText[3].textContent = data[fav].type;
            //     currentFavText[4].textContent = data[fav].history;
            //     currentFavText[5].textContent = data[fav].reason;    
            // }

            currentFav.getElementById(".fav-name").addEventListener("click", function(){ 
            currentFav.getElementById(".fav-section").innerText = ".fav-section"; 
            }); 
        }
    }
        
    fetchData("./includes/index.php").then(data => renderPortfolioThumbnails(data)).catch(error => console.log(error));
})();