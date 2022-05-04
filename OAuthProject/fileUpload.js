$(document).ready(function () {

    const urlSearchParams = new URLSearchParams(window.location.search);
    const getCode = urlSearchParams.get('code');
    var access_token= "";

    $.ajax({
        type: 'POST',
        url: "https://www.googleapis.com/oauth2/v4/token",
        data: {
            code: getCode,
            redirect_uri: "http://localhost/OAuthProject/fileUpload.html", // Redirect url specified in the google console.
            client_secret: "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", // Client secret key generated from the google console.
            client_id: "491689669229-bbt81fnj6j1r8pnkk23e2c0fnvm03uio.apps.googleusercontent.com", // Client id generated from the google console.
            scope: "https://www.googleapis.com/auth/drive", // Scope to access the Eneblaed dive API from the google console.
            grant_type: "authorization_code" 
        },
        dataType: "json",

        // If success getting the access token and storing in the local storage as 'accessToken'
        // and sets the refresh token as 'refreshToken'
        success: function (tokenD) {
            console.log(tokenD);
            localStorage.setItem("accessToken", tokenD.access_token);
            localStorage.setItem("refreshToken",tokenD.refreshToken);
            localStorage.setItem("expires_in",tokenD.expires_in);
            window.history.pushState({}, document.title, "fileUpload.html");
        }
    });

    var Upload = function (uploadFile) {
        this.file = uploadFile;
    };

    Upload.prototype.getName = function () {
        return this.file.name;
    };

    Upload.prototype.upload = function () {
        var newD = new FormData();

        newD.append("file", this.file, this.getName());
        newD.append("upload_file", true);

        $.ajax({
            type: "POST",
            beforeSend: function (req) {
                req.setRequestHeader("Authorization", "Bearer" + " " + localStorage.getItem("accessToken"));

            },
            url: "https://www.googleapis.com/upload/drive/v2/files",
            data: {
                uploadType: "media"
            },
            success: function (data) {
                console.log(data);

            },
            error: function (error) {
                console.log(error);
            },
            async: true,
            data: newD,
            cache: false,
            contentType: false,
            processData: false,
            timeout: 70000
        });
    };

    //  uploads the selected file from the device via the upload method
    $("#fileUp").on("click", function () {
        var fileUp = $("#files")[0].files[0];
        var newUp = new Upload(fileUp);
        newUp.upload();
    });




});