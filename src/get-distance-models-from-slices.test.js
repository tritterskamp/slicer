import {getDistanceModelsFromSlices} from './get-distance-models-from-slices'

describe("getDistanceModelsFromSlices", () => {
  it("takes in an object of models and provides a list of distanceModels", ()=> {

    const input = {
      "b": {y: 100}, //It sorts them properly, too.
      "a": {y: 10},
    };
    const sourceHeight = 400;

    const result = getDistanceModelsFromSlices(sourceHeight, input);

    expect(result).toEqual([
      {startY: 0, distance: 10, sliceId: "initial"},
      {startY: 10, distance: 90, sliceId: "a"}, //goes until the next one
      {startY: 100, distance: 300, sliceId: "b"},
    ])
  });

  it("the distances should add up to the height of the image", ()=> {
    const sourceHeight = 50;
    const input = {
      "a": {y: 10},
      "b": {y: 20},
      "c": {y: 30},
      "d": {y: 40},
    };

    const result = getDistanceModelsFromSlices(sourceHeight, input);

    //Make sure that the sum of all slice distances add up to equal the source height
    const totalDistanceHeight = result.map(distanceModel => {
      return distanceModel.distance
    }).reduce((a,b) => a+b);
    expect(totalDistanceHeight).toEqual(sourceHeight);
  });


});