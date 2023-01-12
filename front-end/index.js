// wrap everythgin in an init function called at the end of the file
import { State } from './state.js';
import { Controller } from './controller.js';
import { View } from './view.js';
import { Path, Request } from './classes.js';

function main() {
  let includedPaths = [];
  let excludedPaths = [];
  //Fetch the spec file and split the paths into included and excluded paths
  fetch('gmp-spec.json')
    .then((response) => response.json())
    .then((data) => {
      //Split paths into included and excluded paths base on whether they have a get request or not.
      for (const pathName in data.paths) {
        let newPath = new Path(pathName, data.paths[pathName]);
        if (Object.keys(data.paths[pathName]).includes('get')) {
          includedPaths.push(newPath);
        } else {
          excludedPaths.push(newPath);
        }
      }
      //Create model, controller, and view (MVC)
      let state = new State(includedPaths, excludedPaths);
      // if (localStorage.getItem('requests')) {
      //   let requests = JSON.parse(localStorage.getItem('requests'));
      //   requests.forEach((request, i) => {
      //     let path = state.paths.find((path) => path.name === request.path);
      //     let newRequest = new Request(path, i);
      //     newRequest.isOpen = request.isOpen;
      //     newRequest.params = request.params;
      //     state.addRequest(newRequest);
      //   });
      // }

      let view = new View(state);
      let controller = new Controller(state, view);

      //load controller callbacks into the view

      controller.start();
    })
    .catch((error) => console.log(error));
}
main();
