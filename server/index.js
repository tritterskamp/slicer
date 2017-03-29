'use strict';

const Hapi = require('hapi');
const im = require('imagemagick');
const easyimg = require('easyimage');

function makeId(prefix, length) {
  prefix = prefix || "";
  length = length || 10;

  var text = "";
  var possible = "0123456789abcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return prefix + "_" + text;
}

const server = new Hapi.Server();
server.connection({port: 4000, host: 'localhost', routes: {cors: true}});

server.start((err) => {

  if (err) {
    throw err;
  }

  console.log(`Server running at: ${server.info.uri}`);
});

/** CUT endpoint */
server.route({
  method: 'POST',
  path: '/cut',
  handler: function (request, reply) {


    const payload = JSON.parse(request.payload);
    /* //Wants: //TODO: error handling if neither of these are supplied correctly
     {
     srcImg: "",
     sliceYs: []
     }
     */

    console.log(payload);

    const originalImagePath = `public${payload.srcImg}`;
    im.identify(originalImagePath, function (err, features) {
      if (err) throw err;
      //features: { format: 'JPEG', width: 3904, height: 2622, depth: 8 }


      const groupId = makeId("slice", 5);

      let prevCrop = null; //make space to record the previous one (to crop the next one)
      let iteratorCount = 1;

      function cropSeries(array, finalCallback) {

        console.log('running cropSeries', array)

        //Crop using first member of the array
        const sliceFileName = `${groupId}_${iteratorCount}.${features.format}`; //slice_asdas_0.jpg
        const outputPath = `public/output/${sliceFileName}`;

        easyimg.rescrop({
          src: originalImagePath, //start with the originalImagePath, then use the next one
          dst: outputPath,
          width: features.width,
          height: array[0],
          y: 100,


          quality: 1,
          gravity: "North"
        }).then(function() {

          //recursive!
          if (array.length > 1) {

            prevCrop = outputPath; //use this one next time
            iteratorCount += 1; //uptick the iterator for file name

            cropSeries(
              array.filter((d, i) => i > 0), //call it again without the first member
              finalCallback
            )
          } else {
            //Execute the final callback
            finalCallback();
          }
        });
      }

      //kick if off!
      cropSeries(payload.sliceYs, function () {
        //send response to client
        console.log('CROP SERIES COMPLETED!')
        reply('CROPPED');
      })

    })
  }


})