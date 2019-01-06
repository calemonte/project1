// Initialize Firebase
var config = {
    apiKey: "AIzaSyCJWXKEB5l1B6UBgZMO4QPa_CT8WLSaRw0",
    authDomain: "project1-e377b.firebaseapp.com",
    databaseURL: "https://project1-e377b.firebaseio.com",
    projectId: "project1-e377b",
    storageBucket: "project1-e377b.appspot.com",
    messagingSenderId: "856485711590"
};

firebase.initializeApp(config);
const database = firebase.database();

// On click event handler for gathering recipe AJAX query.
$(document).on("click", "#recipe-submit", function(e) {

    e.preventDefault();

    // Store generated recipe URL in a variable.
    var recipeURL = createRecipeURL();

    console.log(recipeURL);

    // Call the Edamam API.
    $.ajax({
        url: recipeURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        console.log("Recipe count: " + response.count);

        // Set the current recipe if the API returns recipes.
        if (response.count > 0) {

            // Select random recipe from response hits.
            var currentRecipe = response.hits[Math.floor(Math.random() * response.hits.length)];

            // Set current recipe in currentPair object (we'll push it to firebase later if the user saves the pair).
            currentPair.setCurrentRecipe(
                currentRecipe.recipe.label,
                currentRecipe.recipe.source,
                currentRecipe.recipe.image,
                currentRecipe.recipe.url,
                currentRecipe.recipe.ingredientLines
            );

            // After recipe has been selected, load the movie form.
            $("#user-flow-background").load("movie-load.html", renderUsername);

        // If there aren't any responses, tell the user.
        } else {
            $("#error-text").text("There were no recipes that matched your criteria. Try again!");
            $("#error").modal("show");
        }

    });

});

// On click event handler for gathering movie AJAX query.
$(document).on("click", "#movie-submit", function(e) {

    e.preventDefault();

    // Call createMovieURL function and store in variable.

    // AJAX call to movie database.

    // Pick the first recommended movie from the results.

    // Set current movie in currentPair object.


    // After movie has been selected, show user the results view.
    $("#user-flow-background").load("results-load.html", function() {
        renderResults();
        renderUsername();
    });

});

// If the user logs out, refresh the page to bring them back to the beginning.
$(document).on("click", "#logout-navitem", function(e) {
    location.reload();
});

// If the user clicks the favorite button, push that pair to Firebase and associate with their ID.
$(document).on("click", ".fa-heart", function(e) {

    var recipe = currentPair.getCurrentRecipe();
    // var movie = currentPair.getCurrentMovie();
    var today = moment().format("MMMM Do, YYYY");

    database.ref(firebase.auth().currentUser.uid).push({
        recipeTitle: recipe.title,
        recipeURL: recipe.url,
        recipeSource: recipe.source,
        movieTitle: "Pulp Fiction", // Replace with movie.title
        movieYear: "1994", // Replace with movie.year
        movieURL: "placeholder", // Replace with "https://play.google.com/store/search?q=" + movie.title + "&c=movies&hl=en"
        date: today,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    // LATER: Add some sort of success modal or something that gives the user feedback that the pair has been added.
    // LATER: Add validation so that user can't click the favorites button twice.

});

// Restart the app when the user clicks "start over".
$(document).on("click", "#restart", restart);