var base64Img = require('base64-img');

module.exports = function(imagePath) {
  return base64Img.base64Sync(imagePath).replace("data:image/jpg;base64,", ""); //note, hardcoded to jpg
}