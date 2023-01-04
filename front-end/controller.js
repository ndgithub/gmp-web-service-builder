//the controller acts as the middleman between the model and the view.
// In mvc, the controller should be the only thing that interacts with the model.
// also in mvc, the controller should have very little code in it.
import { Request } from './classes.js';

class Controller {
  constructor(state, view) {
    this.state = state;
    this.view = view;
  }

  start() {
    this.view.loadCallbacks(
      this.onPathClick.bind(this),
      this.onHeaderClick.bind(this),
      this.onInputChange.bind(this)
    );
    this.view.updatePathsUi();
  }

  onPathClick(e) {
    // create a new Request object and add it to the requests array
    let path = this.state.paths[e.target.dataset.id];
    let request = new Request(path);
    console.log(request);
    this.state.addRequest(request);
    //update the requests ui
    this.view.updateRequestsUi(request);
  }

  onHeaderClick(e, request) {
    console.log('header clicked');
    console.log(e.target);
    request.isOpen = !request.isOpen;
    this.view.updateRequestsUi();
  }

  onInputChange(e, param, request) {
    console.log('input changed');
    console.log(e.target.value);
    param.value = e.target.value;
    this.view.updateRequestActualUrl(request);
  }
}

export { Controller };
