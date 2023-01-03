//the controller acts as the middleman between the model and the view.
// In mvc, the controller should be the only thing that interacts with the model.
// also in mvc, the controller should have very little code in it.
import { Request } from './classes.js';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  start() {
    this.view.loadCallbacks(
      this.onPathClick.bind(this),
      this.onHeaderClick.bind(this),
      this.onInputChange.bind(this)
    );
    this.view.updatePathsUi();

    // iterate through paths array and create a div for each and set a data attribute to the index of the path
  }

  onPathClick(e) {
    // create a new Request object and add it to the requests array
    let request = new Request(this.model.paths[e.target.dataset.id]);
    console.log(request);
    this.model.addRequest(request);
    console.log(this.model);
    //update the requests ui
    this.view.updateRequestsUi();
  }

  onHeaderClick(e, request) {
    console.log('header clicked');
    console.log(e.target);
    request.isOpen = !request.isOpen;
    this.view.updateRequestsUi();
  }

  onInputChange(e, param) {
    console.log('input changed');
    console.log(e.target.value);
    param.value = e.target.value;
  }
}

export { Controller };
