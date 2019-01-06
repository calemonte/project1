(function() {

    // Get user elements.
    var txtEmailSignup = $("#email-input-signup");
    // var txtUsernameSignup = $("#username-input");
    var txtPasswordSignup = $("#password-new-input1");
    var txtPasswordSignupConfirm = $("#password-new-input2");
    var txtEmailLogin = $("#email-input-login");
    var txtPasswordLogin = $("#password-input-login");
    var btnSignUp = $("#get-started-signup");
    var btnLogIn = $("#get-started-login");
    var btnLogout = $("#logout-navitem");

    // On click event listener for logging in a returning user.
    btnLogIn.on("click", function(e) {

        e.preventDefault();

        // Gather email and password from form.
        const email = txtEmailLogin.val().trim();
        const pass = txtPasswordLogin.val().trim();
        const auth = firebase.auth();

        // Sign them in and hide modal, clear inputs.
        if (email.includes("@") && pass) {
            const promise = auth.signInWithEmailAndPassword(email, pass);
            $("#get-started").modal("hide");
            txtEmailLogin.val("");
            txtPasswordLogin.val("");

            // Tell the user if the promise produces an error.
            promise.catch(function(err) {
            $("#error-text").text(err.message);
            $("#error").modal("show");
            });
        } else if (!email.includes("@")) {
            $("#error-text").text("Please provide a valid email address.");
            $("#error").modal("show");
        } else if (!pass) {
            $("#error-text").text("Please provide your password.");
            $("#error").modal("show");
        } else {
            $("#error-text").text("Hmmm, that's not correct. Try again.");
            $("#error").modal("show");
        }

    });

    // Add signup event.
    btnSignUp.on("click", function(e) {

        e.preventDefault();

        // Gather email and password from form.
        const email = txtEmailSignup.val().trim();
        const pass = txtPasswordSignup.val().trim();
        const passConfirm = txtPasswordSignupConfirm.val().trim();
        const auth = firebase.auth();

        // Create a new account if both passwords match and email address provided. 
        // NOTE: WRITE BETTER VALIDATION LATER.
        if (email.includes("@") && pass && passConfirm && pass === passConfirm) {
            const promise = auth.createUserWithEmailAndPassword(email, pass);
            $("#get-started").modal("hide");
            txtEmailSignup.val("");
            txtPasswordSignup.val("");
            txtPasswordSignupConfirm.val("");

            // Tell the user if the promise produces an error.
            promise.catch(function(err) {
                $("#error-text").text(err.message);
                $("#error").modal("show");
            });

        } else if (!email.includes("@")) {
            $("#error-text").text("Please provide a valid email address.");
            $("#error").modal("show");
        } else if (!pass || !passConfirm) {
            $("#error-text").text("Please provide a password.");
            $("#error").modal("show");
        } else if (pass && passConfirm && pass !== passConfirm) {
            $("#error-text").text("Passwords must match.");
            $("#error").modal("show");
        } else {
            $("#error-text").text("Hmmm, something's not right. Try signing up again.");
            $("#error").modal("show");
        }

    });

    // Logout user when they click the logout button.
    btnLogout.on("click", function(e) {

        e.preventDefault();
        firebase.auth().signOut();

    });

    // Listen for changes in authentication state.
    firebase.auth().onAuthStateChanged(firebaseUser => {

        // If user is logged in, show the logout & favorites button, hide get started.
        if (firebaseUser) {
            console.log(firebaseUser);
            console.log("current user: " + firebaseUser.uid); // TO DO: Figure out how to pass the user ID to somewhere else in the program.
            btnLogout.show();
            $("#favorites-navitem").show();
            $("#get-started-navitem").hide();

            // Remove landing page content.
            $("#landing-page").remove();

            // Create container for input flows and render greeting.
            renderSectionContainer();

            // Load recipe view.
            $("#user-flow-background").load("recipe-load.html", renderUsername);
        
        // If user is not logged in, display Get Started buttons.
        } else {
            console.log("Not logged in");
            btnLogout.hide();
            $("#favorites-navitem").hide();
            $("#get-started-navitem").show();
        }

    }); 

}());