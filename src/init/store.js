import createStore from './create-store'


const store = createStore({
  app: {
    imageSrc: "/chopping-block/S1-Trend-Sandals.jpg",
    imageWidth: 0,
    imageHeight: 0,
    slices: {
      "a": {y: 115},
      "b": {y: 200},
    }
  }
});


export default store;