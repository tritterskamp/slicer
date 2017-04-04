import store from './init/store.js'
export function getAuthToken(callback=function(){}) {


  if (!store.getState().app.salesforceClientKey || !store.getState().app.salesforceSecretKey) {
    console.warn('need env setup');
    return;
  }

  //First check localstorage for a token.
  let localToken = window.localStorage.getItem("savedSalesforceAuthToken");
    //{value: "XXX", localExpirationTimestamp: 234928374 }
    // or `null` if none exists

  //Parse the stringified JSON from the localStorage entry
  localToken = localToken ? JSON.parse(localToken) : null;

  //If we have a non-expired, automatically fire the callback
  if (localToken && Date.now() < localToken.localExpirationTimestamp) {
    console.log('using saved token');
    callback( localToken.value );
    return;
  }

  const data = {
    clientId : store.getState().app.salesforceClientKey,
    clientSecret : store.getState().app.salesforceSecretKey
  };

  window.$.ajax({
    type: "POST",
    url: "http://localhost:4000/requestToken",
    data: data,
    dataType: "json"
  }).done(data => {

    //Set Data in localstorage so we don't need to hit it for another 30 minutes
    //...
    console.log('setting');
    window.localStorage.setItem("savedSalesforceAuthToken", JSON.stringify({
      value: data.accessToken,
      localExpirationTimestamp: Date.now() + 1800000 //expire 30 minutes from now
    }));

    //Fire calback with data
    callback(data.accessToken); //"asdasd"

  }).catch(data => {
    console.warn('ERROR', data)
  })




}