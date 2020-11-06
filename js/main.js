(() => {
    // start with a Fetch all
    fetch('./includes/functions.php')
        .then(res => res.json()) // parse the JSON (translate) back to plain JS
        .then(data => {
            // this is our data (DataSet.json)
            // converted to a plain JavaScript object
            handleDataSet(data);
        })
    .catch((error) => console.log(error));


    // this receives the data payload from our AJAX request, parses it (turns the returned JSON object back into a plain JavaScript object) and renders the data to our view (the markup in index.html)
    function handleDataSet(data) {
        let favouriteSection = document.querySelector('.favourite-section'),
            favouriteTemplate = document.querySelector('#favourite-template').content;

        debugger;

        // loop through the JavaScript object and for each user, make a copy of the user template we find at the bottom of index.html, populate it with the user's data, and put that fresh copy in the users section in index.html

        for (let favourite in data) {
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

})();