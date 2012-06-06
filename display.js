
function showTasks() {
  var taskContainer = $('div#tasklist.controls');
  var myTasks = getStoreArray('tasklist');
  var visible = false;

  // Show sort radio buttons only in big lists
  if(myTasks.length < 4) {
    $('div#sort').addClass("hidden");
  } else {
    $('div#sort').removeClass("hidden");
  }

  // Add a div for every tasks, so it's easy to remove it afterwards
  for (var id in myTasks) {
    taskContainer.append(
      $(document.createElement("button")).attr({
        type:   'text',
        class:  'btn btn-task',
        id:     id,
      }).text(myTasks[id].task)
      .click(function() {
        taskButtonId = this.id;
        // Details Anzeigen / Verstecken
        if(!visible) {
          refreshTaskdetails(taskButtonId);
          visible = true;
        } else {
          refreshTaskdetails(taskButtonId);
          visible = false;
        }
      })
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

function showDetail(name, value) {
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
      showDetail('Task:', value);
    } else if(key == 'prio') {
      showDetail('Priorität:', value);
    } else if (key == 'date' && value != "") {
      showDetail('Datum:', value);
    } else if (key == 'tag' && value != "") {
      showDetail('#Tag:', value);
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
        $('button#' + id).addClass('task-done');
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
        $('button#' + id).removeClass('task-done');
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
      removeTask(id);
      hideTaskDetails();
    })
  );

}
