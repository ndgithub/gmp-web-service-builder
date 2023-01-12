import { Path } from './classes.js';

// The Model class is responsible for storing the state of the application.
// It handles all the data manipulation and state changes.
// It is the only class that can directly modify the state.

class State {
  constructor(paths, excludedPaths) {
    this.paths = paths;
    this.excludedPaths = excludedPaths;
    this.requests = [];
  }

  //create setters for the state operties
  setPaths(paths) {
    this.paths = paths;
  }
  addRequest(request) {
    this.requests.push(request);
  }
  setExcludedPaths(excludedPaths) {
    this.excludedPaths = excludedPaths;
  }
}
export { State };
