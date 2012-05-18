function save(task, prio, date, tag, status) {
  var myTask = {
    prio    : prio,
    date    : date,
    tag     : tag,
    status  : status
  };

  var tasklist = getStoreArray(task);
  tasklist.push(myTask);
  localStorage.setItem(task, JSON.stringify(tasklist));
}

function delTask(task) {
  localStorage.removeItem(task);
}

function setStatus(task, state) {
  var myTask = getStoreArray(task);
  myTask[0].status = state;
  localStorage.setItem(task, JSON.stringify(myTask));
}

// get tasks, then create a list element for each of them
function loadTasklist() {
  for (var i = 0; i < localStorage.length; i++) {
    showTask(localStorage.key(i));     
  }
}


function getStoreArray(key) {
  // retrieve tasklist from localstorage
  var task = localStorage.getItem(key);

  // if no object has been saved with the given key, initialize an empty array
  if (!task)
    task = new Array();
  else
    task = JSON.parse(task);

  return task;
}
