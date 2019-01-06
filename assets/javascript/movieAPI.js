    // This is our API key
    var APIKey = "e703c9574a99f4f42772b7422d217e2e";

    // Here we are building the URL
    var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + APIKey + "&language=en-US&include_adult=false&include_video=false&page=1";
    console.log(queryURL);


    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);
      });
