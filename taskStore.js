
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
  tasks.splice(id, 1);
  localStorage.setItem('tasklist', JSON.stringify(tasks));
}

function setStatus(id, state) {
  var myTasks = getStoreArray('tasklist');
  myTasks[id].status = state;
  localStorage.setItem('tasklist', JSON.stringify(myTasks));
}

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
