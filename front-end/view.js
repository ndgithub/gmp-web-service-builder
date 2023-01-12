class View {
  constructor(state) {
    this.state = state;
    this.pathsDiv = document.getElementById('paths');
    this.requestsDiv = document.getElementById('requests');
    this.controllerCallbacks = {};
  }
  loadCallbacks(onPathClick, onNameClick, onInputChange, onDeleteClick) {
    this.controllerCallbacks.pathClick = onPathClick;
    this.controllerCallbacks.onNameClick = onNameClick;
    this.controllerCallbacks.inputChange = onInputChange;
    this.controllerCallbacks.onDeleteClick = onDeleteClick;
  }

  updatePathsUi() {
    console.log('updatePathsUi');
    for (let i = 0; i < this.state.paths.length; i++) {
      let pathDiv = document.createElement('div');
      pathDiv.setAttribute('data-id', i);
      pathDiv.setAttribute('class', 'path');
      pathDiv.innerHTML = this.state.paths[i].operationId;
      // add a click event listener to each which creates a new Request object and adds it to the requests array
      pathDiv.addEventListener('click', this.controllerCallbacks.pathClick);
      paths.appendChild(pathDiv);
    }
  }

  updateRequestsUi() {
    console.log('updateRequestsUi');
    let requestsDiv = document.getElementById('requests');
    requestsDiv.innerHTML = '';
    for (let i = 0; i < this.state.requests.length; i++) {
      let request = this.state.requests[i];

      let requestDiv = this.createRequestDiv(request);
      requestDiv.classList.add('request');
      requestsDiv.appendChild(requestDiv);
      // if a request isOpen, show the query parameters
      console.log(request);
      if (request.isOpen) {
        let paramsDiv = document.createElement('div');
        paramsDiv.setAttribute('class', 'params');
        let params = request.params;
        //sort params so that required params are first
        console.log(params);
        params.sort((a, b) => {
          if (a.required && !b.required) {
            return -1;
          } else if (!a.required && b.required) {
            return 1;
          } else {
            return 0;
          }
        });

        for (let j = 0; j < params.length; j++) {
          console.log(params[j]);
          let param = params[j];
          // get index of request in requests array
          let paramDiv = this.createParamDiv(param, request);
          paramsDiv.appendChild(paramDiv);
        }
        requestDiv.appendChild(paramsDiv);

        // create a header div and append it to the requests div
      }
    }
  }

  createRequestDiv(request) {
    console.log('createRequestDiv');
    let requestDiv = document.createElement('div');
    requestDiv.setAttribute('class', 'request');
    console.log(requestDiv);
    //create a div to hold the triangle and the name
    let clickDiv = document.createElement('div');
    clickDiv.setAttribute('class', 'click');
    let triangleDiv = document.createElement('div');
    triangleDiv.setAttribute('class', 'triangle');
    if (request.isOpen) {
      triangleDiv.innerHTML = '▼';
    } else {
      triangleDiv.innerHTML = '▶';
    }
    //add trianlge div to click div
    clickDiv.appendChild(triangleDiv);

    let headerDiv = document.createElement('div');
    headerDiv.classList.add('class', 'header');

    let nameDiv = document.createElement('div');
    nameDiv.setAttribute('class', 'name');
    nameDiv.innerHTML = request.operationId;

    clickDiv.appendChild(nameDiv);
    clickDiv.addEventListener('click', (e) =>
      this.controllerCallbacks.onNameClick(e, request)
    );
    headerDiv.appendChild(clickDiv);
    // create a div that has an x to delete the reqeust when it is clicked
    let deleteDiv = document.createElement('div');
    deleteDiv.setAttribute('class', 'delete');
    deleteDiv.innerHTML = 'x';
    deleteDiv.addEventListener('click', (e) => {
      this.controllerCallbacks.onDeleteClick(e, request);
    });
    clickDiv.appendChild(deleteDiv);

    let urlDiv = document.createElement('div');
    urlDiv.setAttribute('class', 'url');
    // use the request.Id to create a request attribute on the urlDiv
    urlDiv.setAttribute(
      'data-request-index',
      this.state.requests.indexOf(request)
    );

    console.log(request.pathString);
    urlDiv.innerHTML = request.getCompleteUrl();
    console.log(request);
    headerDiv.appendChild(urlDiv);
    console.log(requestDiv);

    requestDiv.appendChild(headerDiv);
    return requestDiv;
  }

  createParamDiv(param, request) {
    let paramDiv = document.createElement('div');
    paramDiv.setAttribute('class', 'param');

    // paramDiv.innerHTML = paramName;
    // create a label and input for each param
    let label = document.createElement('label');
    label.setAttribute('for', param.name);
    label.setAttribute('class', 'param-label');
    if (param.required) {
      label.innerHTML += '*';
    }
    label.innerHTML += param.name + ' = ';
    // if the param is required, add an asterisk to the label

    //add param desctiption to label title
    label.setAttribute('title', param.description);

    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', param.name);
    input.setAttribute('name', param.name);
    input.setAttribute('class', 'param-input');
    // add a data attribute to the input with the index of the request in the requests array
    input.setAttribute(
      'data-request-index',
      this.state.requests.indexOf(request)
    );
    console.log(this.state.requests.indexOf(request));

    console.log(param.value);
    input.setAttribute('value', param.value);
    input.addEventListener('input', (e) =>
      this.controllerCallbacks.inputChange(e, param, request)
    );

    paramDiv.appendChild(label);
    paramDiv.appendChild(input);

    return paramDiv;
  }

  updateRequestActualUrl(request) {
    // console.log(this.state.requests);
    //build the actual url of the path of the web service request using the serverUrl, endpoint and query parameters name and values using the request object

    let urlDiv = document.querySelector(
      `[data-request-index="${this.state.requests.indexOf(request)}"]`
    );
    console.log(urlDiv);
    console.log(this.state.requests.indexOf(request));
    urlDiv.innerHTML = request.getCompleteUrl();
    // console.log(this.state.requests);
  }
}

export { View };
