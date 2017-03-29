'use strict';

const Hapi = require('hapi');
const im = require('imagemagick');

const server = new Hapi.Server();
server.connection({ port: 4000, host: 'localhost' });

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

    //Wants: //TODO: error handling if neither of these are supplied correctly
    /*
      {
        srcImg: "",
        sliceY: []
      }
     */

    console.log(request.payload);

    // im.readMetadata(`${request.payload.srcImg}`, function(err, metadata){
    //   if (err) throw err;
    //   console.log('Shot at '+metadata.exif.dateTimeOriginal);
    // })

    im.identify(`public${request.payload.srcImg}`, function(err, features){
      if (err) throw err;
      console.log(features);
      // { format: 'JPEG', width: 3904, height: 2622, depth: 8 }
    });


    reply('Hello, world!');

  }
});
