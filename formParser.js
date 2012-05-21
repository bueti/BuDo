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
    showTask(taskname);
    }
    return false; 
  });  
});  

function init() {
  loadTasklist();
}

function showTask(task) {
  var taskContainer = $('div#tasklist.controls');
  var myTask = getStoreArray(task);
  var id = task.split(' ').join('');

  if(id.length > 15) {
    id = id.substring(0,14);
  }

  taskContainer.append(
      $(document.createElement("div")).attr({
        id:   'removeme'
      })
      .append(
        $(document.createElement("label")).attr({
          type:   'radio',
          id:     id,
          class:  'radio'
      })
      .text(task)
      .append(
        $(document.createElement("input")).attr({
          type:   'radio',
          id:     'task',
          name:   'tasks',
        })
        .change(function() {
          // Details Anzeigen / Verstecken
          hideTaskDetails(task);
          var c = this.checked ? showTaskDetails(task) : hideTaskDetails(task);
        })
      ))
        );

  if (myTask[0].status) {
    $("#" + id).addClass('task-done');
  }
  if (myTask[0].prio == 'Hoch') {
    $("#" + id).addClass('task-phigh');
  } 
  if (myTask[0].prio == 'Niedrig') {
    $("#" + id).addClass('task-plow');
  }

}

function showKey(container, name, value) {
  container.append(
      $(document.createElement("li"))
      .append(
        name + ": " + value
        )
      )
}

function showTaskDetails(task) {
  var taskDetailsContainer = $('div#taskdetails');
  var taskdetail = getStoreArray(task);

  $("#taskdetails").append('<div id="taskdetails2">');
  var taskDetailsContainer2 = $('div#taskdetails2');

  for (var index in taskdetail) {
    // Ausgabe der Taskdetails
    $.each(taskdetail[index], function(key, value) {
      if(key == 'prio') {
        showKey(taskDetailsContainer2, 'Priorität', value);
      } else if (key == 'date') {
        showKey(taskDetailsContainer2, 'Datum', value);
      } else if (key == 'tag') {
        showKey(taskDetailsContainer2, '#Tag', value);
      }
    });
  }

  taskDetailsContainer2.append(
      $(document.createElement("p"))
      );

  taskDetailsContainer2.append(
      $(document.createElement("button")).attr({
        class:  'btn btn-success span2',
        href:   '#',
      }).text("Erledigt")
      .click(function(event) {
        setStatus(task, true);
        removeTask();
      })
      );

  taskDetailsContainer2.append(
      $(document.createElement("button")).attr({
        class:  'btn span2',
        href:   '#',
      }).text("Bearbeiten")
      .click(function(event) {
        editTask(task);
      })
      );

  taskDetailsContainer2.append(
      $(document.createElement("button")).attr({
        class:  'btn btn-danger span2',
        href:   '#',
      }).text("Löschen")
      .click(function(event) {
        delTask(task);
        removeTask();
        hideTaskDetails();
      })
      );

  taskDetailsContainer2.append('</div>');
}

function hideTaskDetails() {
  $("div#taskdetails2").remove();
}

function removeTask() {
  $("div#removeme").remove();
  loadTasklist();
}
