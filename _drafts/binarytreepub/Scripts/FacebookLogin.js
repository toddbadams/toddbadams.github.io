
window.fbAsyncInit = function () {
    FB.init({
        appId: '128930843890498', // App ID
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true  // parse XFBML
    });

    // http://developers.facebook.com/docs/reference/javascript/FB.Event.subscribe/
    FB.Event.subscribe('auth.authResponseChange', function (response) {

        formInput = function (name, value) {
            var Field = document.createElement("input");
            Field.setAttribute("type", "hidden");
            Field.setAttribute("name", name);
            Field.setAttribute("value", value);
            return Field;
        };

        var form = document.createElement("form");
        form.setAttribute("method", 'post');
        form.setAttribute("action", '/home/FacebookResponse');
        form.appendChild(formInput('status', response.status));
        form.appendChild(formInput('userID', response.authResponse.userID));     
        form.appendChild(formInput('signedRequest', response.authResponse.signedRequest));
        form.appendChild(formInput('expiresIn', response.authResponse.expiresIn));
        form.appendChild(formInput('accessToken', response.authResponse.accessToken));
        document.body.appendChild(form);
        form.submit();
    });

};

// Load the SDK Asynchronously
(function (d) {
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));