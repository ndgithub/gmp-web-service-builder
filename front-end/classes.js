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
  constructor(path) {
    this.operationId = path.operationId;
    this.serverUrl = path.serverUrl;
    this.pathString = path.pathString;
    this.endpoint = path.endpoint;
    //create queryParam array from Path object, and add a value property to each param.
    this.params = path.params.map((param) => {
      param.value = '';
      return param;
    });
    this.isOpen = true;
  }
}

class Param {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

export { Path, Request };
