'use strict';


module.exports = function (file, options) {
  if (!file) throw new Error('no file(s)');
  return _fileHandler(file, options);
};

let fs = require('fs');
let uuid = require('uuid');

const _fileHandler = function (file, options) {
  if (!file) throw new Error('no file');

  const filename = uuid.v1();
  const path = `${options.dest}${filename}`;
  const fileStream = fs.createWriteStream(path);

  return new Promise((resolve, reject) => {
    file.on('error', function (err) {
      reject(err);
    });

    file.pipe(fileStream);

    file.on('end', function (err) {

      console.log('end', file)

      const fileDetails = {
        fieldname: file.hapi.name,
        originalname: file.hapi.filename,
        filename,
        mimetype: file.hapi.headers['content-type'],
        destination: `${options.dest}`,
        path,
        size: fs.statSync(path).size,
      };

      resolve(fileDetails);
    })
  })
};