
function save(task, prio, date, tag, status) {
  tasks = getStoreArray('tasklist');
  var id = tasks.length;
  var myTask = {
    id      : id,
    task    : task,
    prio    : prio,
    date    : date,
    tag     : tag,
    status  : status
  };
  tasks.push(myTask);
  localStorage.setItem('tasklist', JSON.stringify(tasks));
}

function delTask(id) {
  var tasks = getStoreArray('tasklist');
  console.log(tasks);
  tasks.splice(id, 1);
  console.log(tasks);
  localStorage.setItem('tasklist', JSON.stringify(tasks));
  //localStorage.removeItem(task);
}

function setStatus(id, state) {
  var myTasks = getStoreArray('tasklist');
  myTasks[id].status = state;
  localStorage.setItem('tasklist', JSON.stringify(myTasks));
}

// TODO
// get tasks, then create a list element for each of them
//function loadTasklist() {
//  for (var i = 0; i < localStorage.length; i++) {
//    showTask(localStorage.key(i));     
//  }
//}


function getStoreArray(key) {
  // retrieve tasklist from localstorage
  var tasklist = localStorage.getItem(key);

  // if no object has been saved with the given key, initialize an empty array
  if (!tasklist)
    tasklist = new Array();
  else
    tasklist = JSON.parse(tasklist);

  return tasklist;
}
