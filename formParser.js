$(function() {  
  $(".btn").click(function() {  
    // validate and process form here  
    //

    var taskname  = $("#formTask").val();  
    var prio      = $("#formPrio").val();  
    var date      = $("#datepicker").val();  
    var tag       = $("#formTag").val();
    var status    = false;

    if (taskname) {
      save(taskname, prio, date, tag, status)
      showTasks();
    }
  });  
});  

function init() {
  showTasks();
}

function showTasks() {
  var taskContainer = $('div#tasklist.controls');
  var myTasks = getStoreArray('tasklist');
  var visible = false;

  for (var id in myTasks) {
    taskContainer.append(
      $(document.createElement("div")).attr({
        id:   'removeme'
      })
      .append(
        $(document.createElement("button")).attr({
          type:   'text',
          class:  'btn btn-task',
          id:     id,
        }).text(myTasks[id].task)
        .click(function() {
          taskButtonId = this.id;
          // Details Anzeigen / Verstecken
          hideTaskDetails();
          //var c = this.checked ? showTaskDetails(task) : hideTaskDetails(task);
          if(!visible) {
            showTaskDetails(taskButtonId);
            visible = true;
          } else {
            showTaskDetails(taskButtonId);
            visible = false;
          }
        })
      )
    );

    if (myTasks[id].status) {
      $("#" + id).addClass('task-done');
    }
    if (myTasks[id].prio == 'Hoch') {
      $("#" + id).addClass('task-phigh');
    } 
    if (myTasks[id].prio == 'Niedrig') {
      $("#" + id).addClass('task-plow');
    }
  }
}

function showKey(name, value) {
  $("#tasklistdetailed").append(
      $(document.createElement("dt")).text(name))
  $("#tasklistdetailed").append(
      $(document.createElement("dd")).text(value))
}

function showTaskDetails(id) {
  jQuery('<div/>', {
    id:     'taskdetailslist',
    class:  'row-fluid'
  }).appendTo('#taskdetails2');

  var taskDetailsContainer = $('#taskdetailslist');
  var taskdetail = getStoreArray('tasklist');
  
  taskDetailsContainer.append(
      $(document.createElement("dl")).attr({
        class:  "dl-horizontal",
        id:     "tasklistdetailed"
      })
  );

  // Ausgabe der Taskdetails
  $.each(taskdetail[id], function(key, value) {
    if (key == 'task') {
      showKey('Task:', value);
    } else if(key == 'prio') {
      showKey('Priorität:', value);
    } else if (key == 'date' && value != "") {
      showKey('Datum:', value);
    } else if (key == 'tag' && value != "") {
      showKey('#Tag:', value);
    }
  });

  jQuery('<div/>', {
    id: 'taskdetailsbutton',
  }).appendTo('#taskdetails2');

  var taskDetailsButtonContainer = $('#taskdetailsbutton');

  // Erledigt Button nur anzeigen falls der Task noch nicht erledigt ist
  if(taskdetail[id].status == false) {
    taskDetailsButtonContainer.append(
      $(document.createElement("button")).attr({
        class:  'btn btn-success',
        id:     'done',
        href:   '#',
      }).text(" Done")
      .click(function(event) {
        setStatus(id, true);
        //refreshTasklist();
        removeTasks();
        refreshTaskdetails(id);
      })
    );

    jQuery('<i/>', {
      class:  'icon-check icon-white',
    }).prependTo('#done');

  } else {
    taskDetailsButtonContainer.append(
      $(document.createElement("button")).attr({
        class:  'btn btn-inverse',
        id:     'done',
        href:   '#',
      }).text(" Reopen")
      .click(function(event) {
        setStatus(id, false);
        removeTasks();
        refreshTaskdetails(id);
      })
    );

    jQuery('<i/>', {
      class:  'icon-check icon-white',
    }).prependTo('#done'); 
  }

  if(taskdetail[id].status == false) {
    taskDetailsButtonContainer.append(
      $(document.createElement("button")).attr({
        class:  'btn',
        href:   '#',
      }).text(" Edit")
      .prepend(
        $(document.createElement("i")).attr({
          class:  'icon-edit'
        })
      ).click(function(event) {
        editTask(id);
      })
    );
  }

  taskDetailsButtonContainer.append(
    $(document.createElement("button")).attr({
      class:  'btn btn-danger',
      href:   '#',
    }).text(" Delete")
    .prepend(
      $(document.createElement("i")).attr({
        class:  'icon-trash icon-white'
      })
    ).click(function(event) {
      delTask(id);
      removeTasks();
      hideTaskDetails();
    })
  );
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
