var countDone = 0;

function showTasks(sort) {
  var taskContainer = $('div#tasklist.controls');
  var myTasks = getStoreArray('tasklist');
  var visible = false;

  // Show sort radio buttons only in big lists
  if(myTasks.length < 3) {
    $('div#sort').addClass("hidden");
  } else {
    $('div#sort').removeClass("hidden");
  }

  // Sort
  if (sort != null) {
    myTasks = sortTasks(sort, myTasks);
  } else {
    myTasks = sortTasks('name', myTasks);
  }


  // List all Tasks
  for (var id in myTasks) {
    taskContainer.append(
      $(document.createElement("button")).attr({
        type:   'text',
        class:  'btn btn-task',
        id:     myTasks[id].id,
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
      $("#" + myTasks[id].id).addClass('task-done');
      countDone++;
    }
    if (myTasks[id].prio == '0') {
      $("#" + myTasks[id].id).addClass('task-phigh');
    } 
    if (myTasks[id].prio == '2') {
      $("#" + myTasks[id].id).addClass('task-plow');
    }
  }

  // Display remove all button if there are tasks with status done
  if(countDone > 0) {
    showRemoveAllButton();
  }
}

function showRemoveAllButton() {
    $('#removeAllTasks').removeClass("hidden");
}

function delRemoveAllButton() {
    $('#removeAllTasks').addClass("hidden");
}

function showDetail(name, value) {
  $("#tasklistdetailed").append(
      $(document.createElement("dt")).text(name))
  $("#tasklistdetailed").append(
      $(document.createElement("dd")).text(value))
}

function showTaskDetails(id) {
  var taskdetail = getStoreArray('tasklist');
  jQuery('<div/>', {
    id:     'taskdetailslist',
    class:  'row-fluid'
  }).appendTo('#taskdetails2');

  var taskDetailsContainer = $('#taskdetailslist');
  
  taskDetailsContainer.append(
    $(document.createElement("dl")).attr({
      class:  "dl-horizontal",
      id:     "tasklistdetailed"
    })
  );

  // Ausgabe der Taskdetails
  for (var i=0; i<taskdetail.length; i++) {
    if(taskdetail[i].id == id) {
      showDetail('Task:', taskdetail[i].task);
      if(taskdetail[i].prio == 0) var prio = 'Hoch';
      if(taskdetail[i].prio == 1) var prio = 'Normal';
      if(taskdetail[i].prio == 2) var prio = 'Niedrig';
      showDetail('Priorität:', prio);
      showDetail('Datum:', taskdetail[i].date);
      showDetail('#Tag:', taskdetail[i].tag);
    }
  }

  jQuery('<div/>', {
    id: 'taskdetailsbutton',
  }).appendTo('#taskdetails2');

  var taskDetailsButtonContainer = $('#taskdetailsbutton');

  // Erledigt Button nur anzeigen falls der Task noch nicht erledigt ist
  for (var i=0; i<taskdetail.length; i++) {
    if(taskdetail[i].id == id) {
      if(taskdetail[i].status == false) {
        taskDetailsButtonContainer.append(
            $(document.createElement("button")).attr({
              class:  'btn btn-success',
              id:     'done',
            }).text(" Done")
            .click(function(event) {
              setStatus(id, true);
              $('button#' + id).addClass('task-done');
              refreshTaskdetails(id);
              showRemoveAllButton();
              countDone++;
            })
            );

        jQuery('<i/>', {
          class:  'icon-check icon-white',
        }).prependTo('#done');

        taskDetailsButtonContainer.append(
            $(document.createElement("button")).attr({
              class:  'btn',
            }).text(" Edit")
            .prepend(
              $(document.createElement("i")).attr({
                class:  'icon-edit'
              })
              ).click(function(event) {
                editTask(id);
              })
            );

      } else {
        taskDetailsButtonContainer.append(
            $(document.createElement("button")).attr({
              class:  'btn btn-inverse',
              id:     'done',
            }).text(" Reopen")
            .click(function(event) {
              setStatus(id, false);
              $('button#' + id).removeClass('task-done');
              refreshTaskdetails(id);
              countDone--;
              if(countDone > 0) {
                delRemoveAllButton();
              }
            })
            );

        jQuery('<i/>', {
          class:  'icon-check icon-white',
        }).prependTo('#done'); 
      }

      taskDetailsButtonContainer.append(
          $(document.createElement("button")).attr({
            class:  'btn btn-danger',
          }).text(" Delete")
          .prepend(
            $(document.createElement("i")).attr({
              class:  'icon-trash icon-white'
            })
            ).click(function(event) {
              delTask(id);
              removeTask(id);
              hideTaskDetails();
              if(getStoreArray('tasklist').length < 3) {
                $('div#sort').addClass("hidden");
              }
            })
          );
    }
  }
}
