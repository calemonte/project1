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
$(document).on("click", "#recipe-submit", function (e) {

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
$(document).on("click", "#movie-submit", function (e) {

    e.preventDefault();

    // API query constantants
    var movieAPIKey = "e703c9574a99f4f42772b7422d217e2e";
    var userMovies = [];

    // Variables for storing 3 movies from user.
    var movie1 = $("#movie-input1").val().trim();
    var movie2 = $("#movie-input2").val().trim();
    var movie3 = $("#movie-input3").val().trim();
    var selectedMovie;
    var selectedMovieID;

    //push movie input to movie array
    userMovies.push(movie1, movie2, movie3);

    //get random movie from array
    selectedMovie = Math.floor(Math.random() * (userMovies.length));

    var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=" + movieAPIKey + "&language=en-US&query=" + userMovies[selectedMovie] + "&page=1&include_adult=false";

    // AJAX call to movie database to get id of selectedMovie.
    if (userMovies[selectedMovie] !== "") {
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            // If first call is successful then make the second call
            if (response.total_results > 0) {
                
                selectedMovieID = response.results[0].id;

                var queryIDURL = "https://api.themoviedb.org/3/movie/" + selectedMovieID + "/recommendations?api_key=" + movieAPIKey + "&language=en-US&include_adult=false&include_video=false";

                // Ajax call to get the recommended movie.
                $.ajax({
                    url: queryIDURL,
                    method: "GET"
                }).then(function (response) {
                    if (response.total_results > 0) {
                        var randomResults = Math.floor(Math.random() * response.results.length);
                        var finalMovieSelection = (response.results[randomResults]);
                        var year = movieYear(finalMovieSelection.release_date);
                        var imgUrl = "https://image.tmdb.org/t/p/w200" + finalMovieSelection.poster_path;

                        currentPair.setCurrentMovie(
                            finalMovieSelection.original_title,
                            year,
                            imgUrl,
                            finalMovieSelection.overview,
                        );
                        console.log(currentPair.getCurrentMovie());

                        // After movie has been selected, show user the results view.
                        $("#user-flow-background").load("results-load.html", function () {
                            renderResults();
                            renderUsername();
                        });

                    } else {
                        $("#error-text").text("We couldn't find any recommendations based on the movies provided. Please try again.");
                        $("#error").modal("show");
                    }
                });
            } else {
                $("#error-text").text("We didn't find a match for " + userMovies[selectedMovie] + ". Please check your spelling or enter a new movie.");
                $("#error").modal("show");
            }
        });
    // Error handling for when user forgets to enter movies.
    } else {
        $("#error-text").text("Please enter three movies before pressing submit.");
        $("#error").modal("show");
    }

});

// If the user logs out, refresh the page to bring them back to the beginning.
$(document).on("click", "#logout-navitem", function (e) {
    location.reload();
});

// If the user clicks the favorite button, push that pair to Firebase and associate with their ID.
$(document).on("click", ".fa-heart", function (e) {

    var recipe = currentPair.getCurrentRecipe();
    var movie = currentPair.getCurrentMovie();
    var today = moment().format("MMMM Do, YYYY");

    // Only add the pair once.
    if (!$(".fa-heart").hasClass("added")) {

        database.ref(firebase.auth().currentUser.uid).push({
            recipeTitle: recipe.title,
            recipeURL: recipe.url,
            recipeSource: recipe.source,
            movieTitle: movie.title,
            movieYear: movie.year,
            movieURL: "https://play.google.com/store/search?q=" + movie.title + "&c=movies&hl=en",
            date: today,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        // Display feedback for when a pair is favorited.
        var favorited = $("<div id='favorited' class='text-white mb-1'>Favorited!</div>");
        $("#favtext-target").prepend(favorited.hide());

        var $favorited = $("#favorited");
        $($favorited).fadeIn("medium");

        setTimeout(function(){
            $($favorited).fadeOut("slow");
        }, 1000);

    } else {
        $("#error-text").text("You've already favorited this pair!");
        $("#error").modal("show");
    }
    
    $(".fa-heart").addClass("added");

});

// Remove entry from Firebase and the DOM when the user clicks the delete button.
$(document).on("click", ".delete", function (e) {

    e.preventDefault;
    database.ref(firebase.auth().currentUser.uid).child($(this).attr("data-key")).remove();
    $(this).closest(".card").remove();

});

// Restart the app when the user clicks "start over".
$(document).on("click", "#restart", restart);