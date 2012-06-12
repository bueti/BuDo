function hideTaskDetails() {
  $("div#taskdetailslist").remove();
  $("div#taskdetailsbutton").remove();
}

function removeTask(id) {
  $("button#" + id).remove();
}

function refreshTaskdetails(id) {
  hideTaskDetails(id);
  showTaskDetails(id);
}

function editTask(id) {
  alert("Sorry, this is a premium version feature!");
}

function removeTasklist() {
  var myTasks = getStoreArray('tasklist');
  // remove tasks
  for (var i in myTasks) {
    $("button#" + myTasks[i].id).remove();
  }
}

function removeAllCompletedTasks() {
  var myTasks = getStoreArray('tasklist');
  // remove tasks
  for (var i = 0; i<myTasks.length; i++) {
    if(myTasks[i].status) {
      removeTask(myTasks[i].id);
      delTask(myTasks[i].id);
      refreshTaskdetails(myTasks[i].id);
    }
  }
  // Remove remove button ;)
  delRemoveAllButton();
}

/*
 * Sortierungen
 */
function sortTasks(sort, myTasks) {
  // Default sortByName
  if (sort == 'name') { myTasks.sort(sortByName); };
  if (sort == 'tag')  { myTasks.sort(sortByTag);  };
  if (sort == 'date') { myTasks.sort(sortByDate); };
  if (sort == 'prio') { myTasks.sort(sortByPrio); };

  return myTasks;
}

function sortByName(a, b) {
    var aName = a.task.toLowerCase();
    var bName = b.task.toLowerCase(); 
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function sortByTag(a, b){
    var aName = a.tag.toLowerCase();
    var bName = b.tag.toLowerCase(); 
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function sortByDate(a, b) {
    var aName = a.date.toLowerCase();
    var bName = b.date.toLowerCase(); 
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function sortByPrio(a, b) {
    var aName = a.prio.toLowerCase();
    var bName = b.prio.toLowerCase(); 
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

