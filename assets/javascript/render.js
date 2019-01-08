// Function for rendering the main container for the user input flows (recipes and movies).
function renderSectionContainer() {

    // Create main section for holding forms.
    var sectionContainer = $("<section class='container rounded p-3 shadow-sm text-center border-0' id='user-flow-background'>");

    // Append container and greeting to DOM.
    $("body").append(sectionContainer);

};

// Function that renders the logged in user's name.
function renderUsername() {

    $(".username-text").text(firebase.auth().currentUser.email);

}

// Function that renders the results page.
function renderResults() {

    //  Get the current recipe and the  current movie.
    var recipe = currentPair.getCurrentRecipe();
    var movie = currentPair.getCurrentMovie();

    // Populate the recipe card elements with our current recipe. 
    $("#recipe-result > img").attr("src", recipe.imgSrc);
    $("#recipe-title").text(recipe.title);
    $("#recipe-source").text(recipe.source);
    $("#view-recipe-button").attr("href", recipe.url);

    // Iterate through recipe's ingredients and append to hidden dropdown div.
    $.each(recipe.ingredients, function (i, ingredient) {
        var li = $("<li>" + ingredient + "</li>");
        $("#ingredient-list").append(li);
    });

    // Populate the movie card with the recommended movie
    $("#movie-title").text(movie.title);
    $("#movie-year").text(movie.year);
    $("#movie-result > img").attr("src", movie.imgSrc);
    $("#movieplot").text(movie.plot);    
    $("#view-movie-button").attr("href", "https://play.google.com/store/search?q=" + movie.title + "&c=movies&hl=en");

};

// Function for allowing the user to generate another recipe and movie pair. 
function restart() {

    // If the user is logged in, show them the recipe form.
    if (firebase.auth().currentUser) {

        $("#user-flow-background").load("recipe-load.html", renderUsername);

    // Otherse reload the app.
    } else {
        location.reload();
    }

};