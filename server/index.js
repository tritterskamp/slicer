'use strict';

const Hapi = require('hapi');
const im = require('imagemagick');
const easyimg = require('easyimage');
let request = require('request');
let fs = require('fs');

let makeId = require('./helpers/makeId.js');
let getBase64 = require('./helpers/getBase64.js');


/* START THE SERVER */
const server = new Hapi.Server();
server.connection({port: 4000, host: 'localhost', routes: {cors: true}});
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});


/** Uploader to salesforce */
function uploadToSalesforce(data, callback) {
  /*
  { name, base64}
   */

  // {"name": "jpg", "id": 23} //ID is tied to the file type
  // {"name": "gif", "id": 20} //ID is tied to the file type

  const payload = {
    name: data.name,
    file: data.fileBase64,
    assetType: {
      "name": "jpg",
      "id": 23
    },
  };

  console.log('POSTing to Salesforce!');
  request.post("http://www.exacttargetapis.com/asset/v1/content/assets?access_token=XX", {
      json: payload
    }, function (error, response, body) {

      if (error) {
        console.log('ERROR')
        console.log(error)
        return;
      }

      if (!error && response.statusCode == 201) {

        console.log('SUCCESS')
        console.log(body);
        if (callback) {
          callback()
        }
      }
    }
);

}


/** CUT endpoint */
server.route({
  method: 'POST',
  path: '/cut',
  handler: function (request, reply) {


    const payload = JSON.parse(request.payload);
    /* //Wants: //TODO: error handling if neither of these are supplied correctly
     {
     srcImg: "",
     sliceYs: [
        {startY: xxx, distance: xxx},
        {startY: xxx, distance: xxx},
      ]
     }
     */

    console.log(payload);

    const originalImagePath = `public${payload.srcImg}`;

    im.identify(originalImagePath, function (err, features) {
      if (err) throw err;
      //features: { format: 'JPEG', width: 3904, height: 2622, depth: 8 }

      const projId = makeId("sliceTest", 12);

      let iteratorCount = 1;
      function cropSeries(array, finalCallback) {

        console.log('running cropSeries', array)
        const sliceModel = array[0];

        //Friendlier formats
        let useFormat = features.format;
        if (useFormat === "JPEG") { useFormat = "jpg" }

        //Crop using first member of the array
        const sliceFileName = `${projId}_proj${iteratorCount}.${useFormat}`; //slice_asdas_0.jpg
        const outputPath = `public/output/${sliceFileName}`;

        easyimg.rescrop({
          src: originalImagePath, //always crop from the original
          dst: outputPath,
          width: features.width,
          height: features.height,

          x: 0,
          y: sliceModel.startY,

          cropwidth: features.width,
          cropheight: sliceModel.distance,


          gravity: "North",
          quality: 100,
        }).then(function(data) {

          const outputtedSliceName = data.name;
          const outputtedSlicePath = data.path;


            //Upload it.
            uploadToSalesforce({
              name: outputtedSliceName,
              fileBase64: getBase64(outputtedSlicePath)
            }, function(data) {
              console.log('success!')
            });

          //recursive!
          if (array.length > 1) {
            iteratorCount += 1; //uptick the iterator for file name

            //TODO: Not recursive while testing salesforce
            // cropSeries(
            //   array.filter((d, i) => i > 0), //call it again without the first member
            //   finalCallback
            // )

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


});