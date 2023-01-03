class View {
  constructor(model) {
    this.model = model;
    this.pathsDiv = document.getElementById('paths');
    this.requestsDiv = document.getElementById('requests');
    this.controllerCallbacks = {};
  }
  loadCallbacks(onPathClick, onHeaderClick, onInputChange) {
    this.controllerCallbacks.pathClick = onPathClick;
    this.controllerCallbacks.headerClick = onHeaderClick;
    this.controllerCallbacks.inputChange = onInputChange;
  }

  updatePathsUi() {
    for (let i = 0; i < this.model.paths.length; i++) {
      let pathDiv = document.createElement('div');
      pathDiv.setAttribute('data-id', i);
      pathDiv.setAttribute('class', 'path');
      pathDiv.innerHTML = this.model.paths[i].operationId;
      // add a click event listener to each which creates a new Request object and adds it to the requests array
      pathDiv.addEventListener('click', this.controllerCallbacks.pathClick);
      paths.appendChild(pathDiv);
    }
  }

  updateRequestsUi() {
    let requestsDiv = document.getElementById('requests');
    requestsDiv.innerHTML = '';
    for (let i = 0; i < this.model.requests.length; i++) {
      let request = this.model.requests[i];

      let requestDiv = this.createRequestDiv(request);
      requestsDiv.appendChild(requestDiv);
      // if a request isOpen, show the query parameters

      if (request.isOpen) {
        let paramsDiv = document.createElement('div');
        let params = request.params;
        for (let j = 0; j < params.length; j++) {
          // create a param div and
          let param = params[j];
          let paramDiv = this.createParamDiv(param);
          paramsDiv.appendChild(paramDiv);
        }
        requestDiv.appendChild(paramsDiv);

        // create a header div and append it to the requests div
      }
    }
  }

  createRequestDiv(request) {
    let requestDiv = document.createElement('div');
    requestDiv.setAttribute('class', 'request');
    console.log(requestDiv);
    let headerDiv = document.createElement('div');
    headerDiv.setAttribute('class', 'header');
    headerDiv.addEventListener('click', (e) =>
      this.controllerCallbacks.headerClick(e, request)
    );

    let nameDiv = document.createElement('div');
    nameDiv.setAttribute('class', 'name');
    nameDiv.innerHTML = request.operationId;
    headerDiv.appendChild(nameDiv);

    let urlDiv = document.createElement('div');
    urlDiv.setAttribute('class', 'url');
    console.log(request.pathString);
    urlDiv.innerHTML = request.serverUrl + request.endpoint;
    console.log(request);
    headerDiv.appendChild(urlDiv);
    console.log(requestDiv);

    requestDiv.appendChild(headerDiv);
    return requestDiv;
  }

  createParamDiv(param) {
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
    // add a listener on the input for change and update the param value
    input.addEventListener('input', (e) =>
      this.controllerCallbacks.inputChange(e, param)
    );

    input.setAttribute('value', param.value);

    paramDiv.appendChild(label);
    paramDiv.appendChild(input);

    return paramDiv;
  }
}

export { View };
