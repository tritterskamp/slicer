import createStore from './create-store'


const store = createStore({
  app: {
    imageWidth: 0,
    slices: {
      "a": {y: 50}
    }
  }
});


export default store;