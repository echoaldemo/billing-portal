import { auth } from "utils/api";

const authorizeUri = () => {
  var jsonBody = {};
  jsonBody.clientId = process.env.REACT_APP_CLIENT_ID;
  jsonBody.clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  jsonBody.environment = process.env.REACT_APP_ENVIRONMENT;
  jsonBody.redirectUri = process.env.REACT_APP_REDIRECT_URI;

  auth("/authUri", { json: jsonBody }).then((authUri) => {
    // Launch Popup using the JS window Object
    // var parameters = 'location=1,width=800,height=650'
    // parameters +=
    //   ',left=' +
    //   (global.screen.width - 800) / 2 +
    //   ',top=' +
    //   (global.screen.height - 650) / 2
    // var win = window.open(authUri.data, 'connectPopup', parameters)
    // var pollOAuth = window.setInterval(function() {
    //   try {
    //     if (win.document.URL.indexOf('code') !== -1) {
    //       window.clearInterval(pollOAuth)
    //       win.close()
    //       window.location.reload()
    //     }
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }, 100)
    window.open(
      authUri.data,
      "_blank" // <- This is what makes it open in a new window.
    );
  });
};

export { authorizeUri };
