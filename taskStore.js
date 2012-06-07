
function save(task, prio, date, tag, status) {
  tasks = getStoreArray('tasklist');
  var id = Math.floor( Math.random()*999 );
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
  for (var i=0; i<tasks.length; i++) {
    if(tasks[i].id == id) {
      tasks.splice(i, 1);
      break;
    }
  }
  localStorage.setItem('tasklist', JSON.stringify(tasks));
}

function setStatus(id, state) {
  var myTasks = getStoreArray('tasklist');
  for (var i=0; i<myTasks.length; i++) {
    if(myTasks[i].id == id) {
      myTasks[i].status = state;
      break;
    }
  }
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
