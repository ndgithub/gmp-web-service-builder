// wrap everythgin in an init function called at the end of the file
import { State } from './State.js';
import { Path, Request } from './classes.js';

function init() {
  //load the spec file
  fetch('gmp-spec.json')
    .then((response) => response.json())
    .then((data) => {
      let includedPaths = [];
      let excludedPaths = [];
      //Split paths into included and excluded paths base on whether they have a get request or not.
      for (const pathName in data.paths) {
        let newPath = new Path(pathName, data.paths[pathName]);
        if (Object.keys(data.paths[pathName]).includes('get')) {
          includedPaths.push(newPath);
        } else {
          excludedPaths.push(newPath);
        }
      }
      //Initialize state and set paths and excluded paths
      let state = new State();
      state.setPaths(includedPaths);
      state.setExcludedPaths(excludedPaths);

      updatePathsUi(state);
    })
    .catch((error) => console.log(error));

  function updatePathsUi(state) {
    console.log(state.paths);
    // iterate through paths array and create a div for each and set a data attribute to the index of the path
    for (let i = 0; i < state.paths.length; i++) {
      let pathDiv = document.createElement('div');
      pathDiv.setAttribute('data-id', i);
      pathDiv.setAttribute('class', 'path');
      pathDiv.innerHTML = state.paths[i].operationId;
      // add a click event listener to each which creates a new Request object and adds it to the requests array
      pathDiv.addEventListener('click', (e) => {
        let request = new Request(state.paths[e.target.dataset.id]);
        console.log(request);
        state.addRequest(request);
        updateRequestsUi(state);
      });
      apis.appendChild(pathDiv);
    }
  }

  function updateRequestsUi(state) {
    // also, if a request is open, show the query parameters
    let requestsDiv = document.getElementById('requests');
    requestsDiv.innerHTML = '';
    for (let i = 0; i < state.requests.length; i++) {
      let request = state.requests[i];

      let requestDiv = createRequestDiv(request);
      requestsDiv.appendChild(requestDiv);
      // if a request isOpen, show the query parameters

      if (request.isOpen) {
        let paramsDiv = document.createElement('div');
        paramsDiv.setAttribute('class', 'params');
        let params = request.params;
        //grab the query parameters, and create a param div for each, then insert it into the params div
        for (let j = 0; j < params.length; j++) {
          // create a param div and
          let param = params[j];
          let paramDiv = createParamDiv(param);
          paramsDiv.appendChild(paramDiv);
        }
        requestDiv.appendChild(paramsDiv);

        // create a header div and append it to the requests div
      }
    }

    function createRequestDiv(request) {
      let requestDiv = document.createElement('div');
      requestDiv.setAttribute('class', 'request');
      console.log(requestDiv);
      let headerDiv = document.createElement('div');
      headerDiv.setAttribute('class', 'header');
      headerDiv.addEventListener('click', (e) => {
        console.log(e.target);
        request.isOpen = !request.isOpen;
        updateRequestsUi(state);
      });

      let nameDiv = document.createElement('div');
      nameDiv.setAttribute('class', 'name');
      nameDiv.innerHTML = request.operationId;
      headerDiv.appendChild(nameDiv);

      let urlDiv = document.createElement('div');
      urlDiv.setAttribute('class', 'url');
      urlDiv.innerHTML = request.serverUrl;
      headerDiv.appendChild(urlDiv);
      console.log(requestDiv);

      requestDiv.appendChild(headerDiv);
      return requestDiv;
    }

    function createParamDiv(param) {
      let paramDiv = document.createElement('div');
      paramDiv.setAttribute('class', 'param');

      // paramDiv.innerHTML = paramName;
      // create a label and input for each param
      let label = document.createElement('label');
      label.setAttribute('for', param.name);
      label.setAttribute('class', 'param-label');
      label.innerHTML = param.name;
      let input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('id', param.name);
      input.setAttribute('name', param.name);
      input.setAttribute('class', 'param-input');

      input.setAttribute('value', param.value);

      paramDiv.appendChild(label);
      paramDiv.appendChild(input);

      return paramDiv;
    }
  }
  //   let requiredParams = [];
  //   let optionalParams = [];

  //   // loop through requests array, create a div for each request, and append it to the requests div
  //   // also, if a request is open, show the query parameters
  //   let requestsDiv = document.getElementById('requests');
  //   requestsDiv.innerHTML = '';
  //   for (let i = 0; i < requests.length; i++) {
  //     let requestDiv = document.createElement('div');
  //     requestDiv.setAttribute('class', 'request');
  //     //requestDiv.innerHTML = paths[requests[i].pathIndex].operationId;
  //     requestsDiv.appendChild(requestDiv);
  //     console.log(requests[i].isOpen);
  //     // if a request isOpen, show the query parameters
  //     if (requests[i].isOpen) {
  //       console.log(requests);
  //       //grab the query parameters, and create a params div for each, then insert it into the params div
  //       let paramsDiv = document.createElement('div');
  //       paramsDiv.setAttribute('class', 'params');
  //       // create a header div and append it to the requests div
  //       let headerDiv = document.createElement('div');
  //       headerDiv.setAttribute('class', 'header');
  //       //if header.is
  //       //add header to div to the request div
  //       headerDiv.innerHTML = paths[requests[i].pathIndex].operationId;

  //       requestDiv.appendChild(headerDiv);

  //       for (
  //         let j = 0;
  //         j < paths[requests[i].pathIndex].queryParams.length;
  //         j++
  //       ) {
  //         let paramDiv = document.createElement('div');
  //         paramDiv.setAttribute('class', 'param');
  //         paramDiv.innerHTML = paths[requests[i].pathIndex].queryParams[j].name;
  //         paramsDiv.appendChild(paramDiv);
  //       }
  //       requestDiv.appendChild(paramsDiv);

  //       headerDiv.addEventListener('click', () => {
  //         console.log('header clicked');
  //         // if the header is clicked, set isOpen to the opposite of what it is
  //         requests[i].isOpen = !requests[i].isOpen;
  //         updateUi();
  //       });

  //       requestDiv.appendChild(paramsDiv);
  //     } else {
  //       // if the request is not open, just show the header
  //       let headerDiv = document.createElement('div');
  //       headerDiv.setAttribute('class', 'header');
  //       headerDiv.innerHTML = paths[requests[i].pathIndex].operationId;
  //       requestDiv.appendChild(headerDiv);
  //       headerDiv.addEventListener('click', () => {
  //         console.log('header clicked');
  //         // if the header is clicked, set isOpen to the opposite of what it is
  //         requests[i].isOpen = !requests[i].isOpen;
  //         updateUi();
  //       });
  //     }
  //   }
  // }

  // function createRequest(e) {
  //   // if a path is already selected, set isSelected to false
  //   paths.forEach((path) => {
  //     if (path.isSelected) {
  //       path.isSelected = false;
  //     }
  //   });

  //   console.log(paths[e.target.dataset.id]);
  //   paths[e.target.dataset.id].isSelected = true;
  //   // if a request is already selected, set isSelected to false
  //   requests.forEach((request) => {
  //     if (request.isSelected) {
  //       request.isSelected = false;
  //     }
  //   });
  //   //create a new Request object and add it to the requests array
  //   let request = new Request(e.target.dataset.id);
  //   requests.push(request);
  //   console.log(requests);

  //   updateUi();
  // }

  // function createParamsDiv() {
  //   let paramsDiv = document.createElement('div');
  //   paramsDiv.setAttribute('id', 'params');
  //   //create two divs, one for required params and one for optional params and append them to the params div
  //   let requiredParamsDiv = document.createElement('div');
  //   requiredParamsDiv.setAttribute('id', 'required');
  //   paramsDiv.appendChild(requiredParamsDiv);
  //   let optionalParamsDiv = document.createElement('div');
  //   optionalParamsDiv.setAttribute('id', 'optional');
  //   paramsDiv.appendChild(optionalParamsDiv);

  //   return paramsDiv;
  // }
}

init();
