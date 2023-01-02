import { Path } from './classes.js';

class State {
  constructor() {
    this.paths = [];
    this.excludedPaths = [];
    this.requests = [];
  }

  //create setters for the state properties
  setPaths(paths) {
    this.paths = paths;
  }
  addRequest(request) {
    this.requests.push(request);
  }
  setExcludedPaths(excludedPaths) {
    this.excludedPaths = excludedPaths;
  }

  setState(newState) {
    //check the difference netween the old state and the new state objects
    //if the difference is in the paths array, call setPathsState
    if (newState.paths !== this.paths) {
      console.log('paths changed');
      console.log(newState);
      console.log(this.paths);

      this.paths = newState;
      console.log(this.paths);
      console.log('paths changed');
      console.log(this.paths);
      let pathsArray = [];
      for (const pathName in this.paths) {
        if (Object.keys(this.paths[pathName]).includes('get')) {
          let mypath = new Path(pathName, this.paths[pathName]);
          this.paths.push(mypath);
        } else {
          let mypath = new Path(pathName, this.paths[pathName]);
          this.pathsNotIncluded.push(mypath);
        }
      }
      updatePathsUi();
    }
    //if the difference is in the requests array, call setRequestsState
    if (newState.requests !== state.requests) {
      console.log('requests changed');
      updateRequestsUi();
    }
    //if the difference is in a single request, call setRequestState
    if (newState.request !== state.request) {
      console.log('single request changed');
      updateSingleRequestUi();
    }
  }
}

export { State };
