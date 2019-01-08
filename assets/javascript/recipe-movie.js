// Object for storing current recipe and movie pair information.
var currentPair = {

    currentRecipe: {

        title: "",
        source: "",
        imgSrc: "",
        url: "",
        ingredients: []

    },

    currentMovie: {

        title: "",
        year: "",
        imgSrc: "",
        plot: ""

    },

    // Method for setting the current recipe based on the AJAX call.
    setCurrentRecipe: function (rTitle, rSource, rImg, rURL, rIngredients) {

        this.currentRecipe.title = rTitle;
        this.currentRecipe.source = rSource;
        this.currentRecipe.imgSrc = rImg;
        this.currentRecipe.url = rURL;
        this.currentRecipe.ingredients = rIngredients;

    },

    // Method for setting the current movie based on the AJAX call.
    setCurrentMovie: function (rTitle, rYear, rImg, rPlot) {

        this.currentMovie.title = rTitle;
        this.currentMovie.year = rYear;
        this.currentMovie.imgSrc = rImg;
        this.currentMovie.plot = rPlot;

    },

    // Method for getting the current recipe object.
    getCurrentRecipe: function () {
        return this.currentRecipe;
    },

    // Method for getting the current movie object.
    getCurrentMovie: function () {
        return this.currentMovie;
    }

};

// Function that creates the recipe API Query.
function createRecipeURL() {

    // API query constants.
    var baseURL = "https://api.edamam.com/search?q=";
    var appID = "238bb8f3";
    var apiKey = "40cbe055ca2da4f4745859559f6a06a0";

    // Variables for storing user selections.
    var serving = parseInt($("#serving-select").children("option:selected").val());
    var dietPreference = "&health=" + $("#diet-select").children("option:selected").val();
    var protein = $("#protein-select").children("option:selected").val();
    var veggies = [];
    var allergies = [];

    // Gather veggie options and push into array.
    $.each($("#veggie-select option:selected"), function () {
        veggies.push($(this).val());
    });

    // Gather allergy options and push into array.
    $.each($("#allergy-select option:selected"), function () {
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

//function to return the movie release year
function movieYear(releaseDate) {
    var arr = releaseDate.split("-");
    var year = arr[0];
    return year;
};