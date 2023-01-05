class Path {
  constructor(endpoint, endpointData) {
    this.endpoint = endpoint;
    this.pathString = Object.values(endpointData)[0].pathString;
    this.serverUrl = Object.values(endpointData)[0].servers[0].url;
    this.operationId = Object.values(endpointData)[0].operationId;
    this.params = Object.values(endpointData)[0].parameters;
    this.tags = Object.values(endpointData)[0].tags;
    this.isSelected = false;
  }
}

class Request {
  constructor(path, index) {
    this.index = index;
    this.operationId = path.operationId;
    this.serverUrl = path.serverUrl;
    this.pathString = path.pathString;
    this.endpoint = path.endpoint;
    this.completeUrl;
    //create a copy of each object in path.params and store it in this.params
    this.params = path.params.map((param) => {
      return new Param(param.name, '');
    });

    // this.params = path.params.map((param) => {
    //   param.value = '';
    //   return param;
    // });
    this.isOpen = true;
  }

  getCompleteUrl() {
    let completeUrl = this.serverUrl + this.endpoint;
    let params = this.params;
    for (let i = 0; i < params.length; i++) {
      let param = params[i];
      if (param.value) {
        //if this is the first param, add a ? to the url
        if (i === 0) {
          completeUrl += '?';
        } else {
          //otherwise add an & to the url
          completeUrl += '&';
        }
        completeUrl += param.name + '=' + param.value;
      }
    }
    return completeUrl;
  }
}

class Param {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

export { Path, Request };
