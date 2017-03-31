import store from './init/store.js'
export function getAuthToken(callback=function(){}) {

  //First check localstorage for a token.
  const localToken = localStorage.getItem("savedSalesforceAuthToken");

  //If we have a non-expired, automatically fire the callback
  if (localToken && localToken.expires < Date.now()) {
    callback( localToken.value )
  }

  const data = {
    clientId : store.getState().app.salesforceClientKey,
    clientSecret : store.getState().app.salesforceSecretKey
  };

  window.$.ajax({
    type: "POST",
    url: "https://auth.exacttargetapis.com/v1/requestToken",
    data: data,
    dataType: "json"
  }).done(data => {
    console.log(data)
  }).catch(data => {
    console.log(data)
  })




}