import createStore from './create-store'


const store = createStore({
  app: {
    imageSrc: "/chopping-block/S1-Trend-Sandals.jpg",
    imageWidth: 0,
    imageHeight: 0,
    slices: {
      "initial": {
        y: 0, //CANNOT DELETE THIS ONE
        hasLink: true,
        linkText: "",
        altText: "",
      }
    }
  }
});


export default store;