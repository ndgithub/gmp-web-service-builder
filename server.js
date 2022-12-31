import axios from 'axios';
import express from 'express';
import SwaggerParser from '@apidevtools/swagger-parser';
import fs from 'fs';

const app = express();
const port = 3000;
const __dirname = process.cwd();
let data = {};

let url =
  'https://raw.githubusercontent.com/googlemaps/openapi-specification/main/dist/google-maps-platform-openapi3.json';

//
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
// serve the front-end folder as static files
app.use(express.static('front-end'));

axios.get(url).then((response) => {
  data = response.data;

  //dereference data with swagger-parser
  SwaggerParser.dereference(data, (err, api) => {
    if (err) {
      console.error(err);
    } else {
      api = api;

      //write bundled data to front-end folder
      fs.writeFile('front-end/gmp-spec.json', JSON.stringify(api), (err) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log('File has been created');
      });
    }
  });
});
