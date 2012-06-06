function sortByField() {
  var parentContainer = $('div#todos');
  var sortByContainer = $(document.createElement("div")).attr({
    id:     'sortBy',
    class:  'controls'
  });
  var prioRadio = $(document.createElement("label")).attr({
      class:  'radio inline',
    }).append(
    $(document.createElement("input")).attr({
      type:   'radio',
      id:     'prioRadio',
    })
  );
  var nameRadio = $(document.createElement("label")).attr({
      class:  'radio inline',
    }).append(
    $(document.createElement("input")).attr({
      type:   'radio',
      id:     'nameRadio',
    })
  );
  
  sortByContainer.append(prioRadio.append(nameRadio));
  parentContainer.append(sortByContainer);
}


function sortByName() {
  var mylist = $('#tasklist');
  var listitems = mylist.children('button').get();
  listitems.sort(function(a, b) {
       return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
  })
  $.each(listitems, function(idx, itm) { mylist.append(itm); });
}

function hideTaskDetails() {
  $("div#taskdetailslist").remove();
  $("div#taskdetailsbutton").remove();
}

function removeTasks() {
  $("div#removeme").remove();
  showTasks();
}

function refreshTasklist() {
  removeTasks();
  showTasks();
}

function refreshTaskdetails(id) {
  hideTaskDetails(id);
  showTaskDetails(id);
}

function editTask(id) {
  alert("Sorry, this is a premium version feature!");
}
