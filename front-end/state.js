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
    // this.saveState();
  }
  setExcludedPaths(excludedPaths) {
    this.excludedPaths = excludedPaths;
  }
  deleteRequest(request) {
    let index = this.requests.indexOf(request);
    this.requests.splice(index, 1);
    // this.saveState();
  }

  // create a method that stores state in local storage
  // saveState() {
  //   localStorage.setItem('requests', JSON.stringify(this.requests));
  // }
}
export { State };
