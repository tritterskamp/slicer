import createStore from './create-store'

const store = createStore({
  app: {
    outputText: null, //gets populated
    imageSrc: "/chopping-block/ap5.jpg",
    imageWidth: 0,
    imageHeight: 0,
    slices: {
      "initial": {
        y: 0, //CANNOT DELETE THIS ONE
        hasLink: true,
        linkText: "",
        altText: "",
      }
    },



    //Salesforce auth process
    salesforceClientKey: process.env.REACT_APP_SALESFORCE_CLIENT_KEY || null,
    salesforceSecretKey: process.env.REACT_APP_SALESFORCE_SECRET_ID || null,
    salesforceAuthToken: null //Provided by salesforce using Client and Secret. Need to send this with Cut/Upload request


  }
});


export default store;