// Object for storing current recipe and movie pair information.
var currentPair = {

    currentRecipe: {

        title: "",
        source: "",
        imgSrc: "",
        url: "",
        ingredients: [],
    
    },

    currentMovie: {

        title: "",
        year: "",
        imgSrc: "",
        plot: "",
        // googlePlayURL: "https://play.google.com/store/search?q=" + title + "&c=movies&hl=en"
        
    },

    // Method for setting the current recipe based on the AJAX call.
    setCurrentRecipe: function(rTitle, rSource, rImg, rURL, rIngredients) {

        this.currentRecipe.title = rTitle;
        this.currentRecipe.source = rSource;
        this.currentRecipe.imgSrc = rImg;
        this.currentRecipe.url = rURL;
        this.currentRecipe.ingredients = rIngredients;

    },

    // Method for setting the current movie based on the AJAX call.
    setCurrentMovie: function(rTitle, rYear, rImg, rPlot) {

        this.currentMovie.title = rTitle;
        this.currentMovie.year = rYear;
        this.currentMovie.imgSrc = rImg;
        this.currentMovie.plot = rPlot;

    },

    // Method for getting the current recipe object.
    getCurrentRecipe: function() {
        return this.currentRecipe;
    },

    // Method for getting the current movie object.
    getCurrentMovie: function() {
        return this.currentMovie;
    }

};

// Function that creates the recipe API Query.
function createRecipeURL() {

    // API query constants.
    //the recipe API
    var baseURL = "https://api.edamam.com/search?q=";
    var appID = "238bb8f3";
    var apiKey = "40cbe055ca2da4f4745859559f6a06a0";



    // Variables for storing user selections.
    var serving = parseInt($("#serving-select").children("option:selected").val()); // yield is under recipe.yield
    var dietPreference = "&health=" + $("#diet-select").children("option:selected").val();
    var protein = $("#protein-select").children("option:selected").val();
    var veggies = [];
    var allergies = [];

    // Gather veggie options and push into array.
    $.each($("#veggie-select option:selected"), function() {            
        veggies.push($(this).val());
    });
    
    // Gather allergy options and push into array.
    $.each($("#allergy-select option:selected"), function() {            
        allergies.push($(this).val());
    });

    // Construct URL based on selections.
    var URL = baseURL + protein + "," + veggies.join(",") + "&app_id=" + appID + "&app_key=" + apiKey;

    // Add diet preferences to URL if selected.
    if ($("#diet-select").children("option:selected").val()) {
        URL += dietPreference;
    }

        // Add allergies to URL if selected.
    if ($("#allergy-select").children("option:selected").val()) {
        URL += "&excludes=" + allergies.join("&excludes=");
    }

    return URL;

};

// // Function that creates the movie URL. INCOMPLETE -- ED TO HANDLE.
// function createMovieURL() {
// debugger;
//     // API query constants.
//     var movieAPIKey = "e703c9574a99f4f42772b7422d217e2e";
//     //var queryIDURL = "https://api.themoviedb.org/3/movie/" + selectedMovie + "/recommendations?api_key=" + movieAPIKey + "&language=en-US&include_adult=false&include_video=false";
   

//     var userMovies = [];

//     // Variables for storing 3 movies from user.
//     var movie1 = $("#movie-input1").val().trim();
//     var movie2 = $("#movie-input2").val().trim();
//     var movie3 = $("#movie-input3").val().trim();

//     userMovies.push(movie1, movie2, movie3);
//     console.log(userMovies);
    
//     for (var i = 0; i < userMovies.length; i++)

//     var selectedMovie = Math.floor(Math.random() * (userMovies.length));

//     console.log(userMovies[selectedMovie]);

//     var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=" + movieAPIKey + "&language=en-US&query=" + userMovies[selectedMovie] + "&page=1&include_adult=false"
//     console.log(queryURL);
    

// };