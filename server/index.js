'use strict';

const Hapi = require('hapi');
const im = require('imagemagick');

function makeId(prefix, length) {
  prefix = prefix || "";
  length = length || 10;

  var text = "";
  var possible = "0123456789abcdefghijklmnopqrstuvwxyz";

  for( var i=0; i < length; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return prefix+"_"+text;
}

const server = new Hapi.Server();
server.connection({ port: 4000, host: 'localhost', routes: { cors: true } });

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

    console.log(payload)

    const path = `public${payload.srcImg}`;
    im.identify(path, function(err, features) {
      if (err) throw err;
      //features: { format: 'JPEG', width: 3904, height: 2622, depth: 8 }

      const sliceIndex = 0;
      const groupId = makeId("slice", 5);
      const sliceFileName = `${groupId}_${sliceIndex}.${features.format}`; //slice_asdas_0.jpg

      im.crop({
        srcPath: path,
        dstPath: `public/output/${sliceFileName}`,
        width: features.width,
        height: 115,
        quality: 1,
        gravity: "North"
      }, function(err, stdout, stderr){

        // foo
        reply('CROPPED');

      });




    });
  }
});
