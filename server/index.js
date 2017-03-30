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

function salesForceMocker(data, callback) {
  callback({
    sliceId: data.sliceId,
    sliceWidth: 500,
    sliceHeight: 361,
    publishedUrl: "http://image.email.caleres.com/lib/fe9f13727765057d76/m/2/df95628e-b4d8-4516-adc5-f459f2c42022.jpg"
  });
}

/** Uploader to salesforce */
function uploadToSalesforce(data, callback) {
  /* data schema: { name, fileBase64, sliceId} */

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
  request.post("http://www.exacttargetapis.com/asset/v1/content/assets?access_token=7mlkMXPuxOCXrvzubrWKN8PB", {
      json: payload
    }, function (error, response, body) {

      if (error) {
        console.log('ERROR')
        console.log(error)
        return;
      }

      if (!error && response.statusCode === 201) {

        console.log('UPLOAD SUCCESS');
        console.log(body);
        const uploadedProperties = body.fileProperties; //from API response
        if (callback) {
          callback({ //Same as what the mockup does
            sliceId: data.sliceId,
            sliceWidth: uploadedProperties.width,
            sliceHeight: uploadedProperties.height,
            publishedUrl: uploadedProperties.publishedURL
          });

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

    let response = []; //The end result for the client

    const payload = JSON.parse(request.payload);
    /* //Wants: //TODO: error handling if neither of these are supplied correctly
     {
     srcImg: "",
     sliceYs: [
        {startY: xxx, distance: xxx, sliceId: xx},
        {startY: xxx, distance: xxx, sliceId: xx},
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
      let sliceId = null; //this gets replaced in every iterations

      function cropSeries(array, finalCallback) {

        console.log('running cropSeries', array)
        const sliceModel = array[0];
        sliceId = sliceModel.sliceId

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


          //mocking salesforce for now
          //salesForceMocker({ //swappable line
          uploadToSalesforce({
            name: outputtedSliceName,
            fileBase64: getBase64(outputtedSlicePath),
            sliceId: sliceId
          }, function(data) {
            response.push(data);
            console.log('success!')

            //recursive!
            if (array.length > 1) {
              iteratorCount += 1; //uptick the iterator for file name
              cropSeries(
                array.filter((d, i) => i > 0), //call it again without the first member
                finalCallback
              )
            } else {
              //Execute the final callback
              finalCallback(response);
            }


          });



        });
      }

      //kick if off!
      cropSeries(payload.sliceYs, function(finalData) {
        //send response to client
        console.log('CROP SERIES COMPLETED!', finalData)
        reply({
          data: finalData
        });
      })

    })
  }


});