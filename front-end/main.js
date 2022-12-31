console.log('Hello from main.js!');
let paths = [];
let selectedPathDiv;
fetch('gmp-spec.json')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    for (const path in data.paths) {
      console.log(data.paths[path]);
      paths.push(data.paths[path]);
    }
    showPaths();
  })
  .catch((error) => console.log(error));

function showPaths() {
  console.log(paths);

  let list = document.getElementById('request-list');
  let counter = 0;

  // iterate through paths array and create a div for each and set a data attribute to the index of the path
  paths.forEach((path) => {
    let pathDiv = document.createElement('div');
    pathDiv.setAttribute('data-path', counter++);
    pathDiv.setAttribute('class', 'path');
    console.log(path);
    pathDiv.innerHTML = Object.values(path)[0].operationId;
    list.appendChild(pathDiv);
    //add event listener to each path div to show parameters
    pathDiv.addEventListener('click', showParams);
  });
  counter = 0;
}

//Shows required parameters for the selected path in panel-2
function showParams(e) {
  selectedPathDiv = e.target;
  if (document.getElementById('path-selected')) {
    document.getElementById('path-selected').removeAttribute('id');
  }

  selectedPathDiv.setAttribute('id', 'path-selected');
  console.log(paths);
  console.log(e.target.dataset.path);
  let path = paths[e.target.dataset.path];
  console.log(path);
  let params = Object.values(path)[0].parameters;
  console.log(params);
  let paramList = document.getElementById('param-list');
  paramList.innerHTML = '';
  //iterate through params array and create a div for each and set a data attribute to the index of the param
  params.forEach((param) => {
    console.log(param);

    let paramDiv = document.createElement('div');
    paramDiv.setAttribute('data-param', param.name);
    paramDiv.setAttribute('class', 'param');
    if (param.required) {
      paramDiv.setAttribute('class', 'param-required');
    }
    paramDiv.innerHTML = param.name;
    paramList.appendChild(paramDiv);
  });
}
