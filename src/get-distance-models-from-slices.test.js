import {getDistanceModelsFromSlices} from './get-distance-models-from-slices'

describe("getDistanceModelsFromSlices", () => {
  it("takes in an object of models and provides a list of distanceModels", ()=> {

    const input = {
      "a": {y: 10},
      "b": {y: 100},
    }

  });

  xit("sorts the input by y values first", ()=> {
    const input = {
      "b": {y: 200},
      "a": {y: 10}, //this should be sorted ahead of the other one first
    }
  });

  xit("the distances should add up to the height of the image", ()=> {
    const imageHeight = 50;
    const input = {
      "a": {y: 10},
      "b": {y: 20},
      "c": {y: 30},
      "d": {y: 40},
    }

    //The distances of output should add up to 50
  });


});