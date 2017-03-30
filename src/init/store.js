import createStore from './create-store'


const store = createStore({
  app: {
    imageSrc: "/chopping-block/S1-Trend-Sandals.jpg",
    imageWidth: 0,
    imageHeight: 0,
    slices: {
      "a": {
        y: 512,
        hasLink: false,
        linkText: "",
        altText: "Cool Shoes",
      },
      "b": {
        y: 700,
        hasLink: true,
        linkText: "http://famousfootwear.com/yep",
        altText: "Shop Now",
      },
    }
  }
});


export default store;