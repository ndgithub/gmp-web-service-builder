// class Path {
//   constructor(endpoint, endpointData) {
//     this.endpoint = endpoint;
//     this.serverUrl = Object.values(endpointData)[0].servers[0].url;
//     this.name = Object.values(endpointData)[0].operationId;
//     this.queryParams = Object.values(endpointData)[0].parameters;
//     this.tags = Object.values(endpointData)[0].tags;
//   }
// }

// let paths = [];
// fetch('gmp-spec.json')
//   .then((response) => response.json())
//   .then((data) => {
//     // iterate over data.paths object and create a new Path object for each path
//     for (const path in data.paths) {
//       console.log(data.paths[path]);
//       let mypath = new Path(path, data.paths[path]);
//       console.log(data.paths[path]);
//       //log all the properties of the path object
//       paths.push(mypath);
//     }
//     //log all the properties of the path object
//     showPathParams(paths[3]);
//   })
//   .catch((error) => console.log(error));

// // logs all of the path argument properties
// function showPathParams(path) {
//   for (const key in path) {
//     console.log(key, path[key]);
//   }
// }
