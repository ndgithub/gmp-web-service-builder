class Path {
  constructor(endpoint, endpointData) {
    this.endpoint = endpoint;
    this.serverUrl = Object.values(endpointData)[0].servers[0].url;
    this.operationId = Object.values(endpointData)[0].operationId;
    this.queryParams = Object.values(endpointData)[0].parameters;
    this.tags = Object.values(endpointData)[0].tags;
    this.isSelected = false;
  }
}

class Request {
  constructor(pathsIndex) {
    this.pathIndex = pathsIndex;
    this.queryParamValues = [];
    this.isOpen = true;
  }
}

export { Path, Request };
