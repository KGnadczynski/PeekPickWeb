/**
 * Cannonball Web JavaScript.
 * Romain Huet
 * @romainhuet
 */



function onLoginButtonClick() {
    console.log('Digits login started.');

  $('.digits-button').click(onLoginButtonClick);

    Digits.logIn({
       phoneNumber: '+48'
    })
    .done(onLogin).fail(onLoginFailure);
  }

function onLogin(loginResponse) {
    console.log('Digits login succeeded.');
    var oAuthHeaders = parseOAuthHeaders(loginResponse.oauth_echo_headers);
    window.angularComponentRef.component.onSubmitDigitsCallback(oAuthHeaders);
  }

function parseOAuthHeaders(oAuthEchoHeaders) {
    var credentials = oAuthEchoHeaders['X-Verify-Credentials-Authorization'];
    var apiUrl = oAuthEchoHeaders['X-Auth-Service-Provider'];

    return {
      apiUrl: apiUrl,
      credentials: credentials
    };
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



function onLoadDigits() {
    console.log('Digits phone number retrieved.')
    setDigitsNumber(response.phoneNumber);
}


