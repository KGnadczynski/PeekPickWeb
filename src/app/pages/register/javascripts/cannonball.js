/**
 * Cannonball Web JavaScript.
 * Romain Huet
 * @romainhuet
 */



function onLoginButtonClick() {
    console.log('Digits login started.');
    Digits.logIn().done(onLogin).fail(onLoginFailure);
  }

function onLogin(loginResponse) {
    console.log('Digits login succeeded.');
    onSubmitDigitsCallback();
  }

/**
 * Handle the login failure.
 */
function onLoginFailure(loginResponse) {
  console.log('Digits login failed.');
}


function onDigitsSuccess(response) {
    console.log('Digits phone number retrieved.')
    setDigitsNumber(response.phoneNumber);
  }

(function () {
  /**
   * Initialize Digits for Web as soon as the JavaScript SDK is loaded.
   */
  $('#digits-sdk').load(function () {
    // Initialize Digits using the API key.
    Digits.init({ consumerKey: "ZzsVNIxtpghaF2Lroz0cZC9q9"})
      .done(function() {
        console.log('Digits initialized.');
      })
      .fail(function() {
        console.log('Digits failed to initialize.');
      });

    // Set a click event listener on the Digits button.
    $('.digits-button').click(onLoginButtonClick);
  });
})();
