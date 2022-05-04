$(document).ready(function () {
    var url = ""

    $("#loginButton").click(function () {

        url = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri="
            + "http://localhost/OAuthProject/fileUpload.html" // Redirect url specified in the google console.
            + "&prompt=consent&response_type=code&client_id="
            + "491689669229-bbt81fnj6j1r8pnkk23e2c0fnvm03uio.apps.googleusercontent.com" // Client id generated from the google console.
            + "&scope="
            + "https://www.googleapis.com/auth/drive" // Scope to access the Eneblaed dive API from the google console.
            + "&access_type=offline";

        window.location = url;
    })
});

