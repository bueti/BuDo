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
  });  
});  

function init() {
  loadTasklist();
}

function showTask(task) {
  var taskContainer = $('div#tasklist.controls');
  var myTask = getStoreArray(task);
  var id = task.split(' ').join('');
  var test = false;

  if(id.length > 15) {
    id = id.substring(0,14);
  }

  taskContainer.append(
      $(document.createElement("div")).attr({
        id:   'removeme'
      })
      .append(
        $(document.createElement("button")).attr({
          type:   'text',
          class:  'btn btn-task',
          id:     id,
        }).text(task)
        .click(function() {
          // Details Anzeigen / Verstecken
          hideTaskDetails(task);
          //var c = this.checked ? showTaskDetails(task) : hideTaskDetails(task);
          if(!test) {
            showTaskDetails(task);
            test = true;
          } else {
            test = false;
          }
        })
      )
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
          //    $(document.createElement("fieldset")).append(
          //$(document.createElement("div")).attr({
          //  class:  'control-group'
          //}).append(
            $(document.createElement("label")).attr({
              class:  'control-label'
            }).text(name).add(
              $(document.createElement("div")).attr({
                class:  'controls'
              })
              .append(
                $(document.createElement("span")).attr({
                  class:  'input-xlarge uneditable-input'
                }).text(value)
                )
              ))
          //))
}

function showTaskDetails(task) {
  var taskDetailsContainer = $('#taskdetails');
  var taskdetail = getStoreArray(task);

  $("#taskdetails").append('<div id="taskdetails2">');

  
  $("#taskdetails2").append('<form class="form-horizontal" id="form-details">');
  $("#taskdetails2").append('<fieldset>');
  $("#taskdetails2").append('<div class="control-group">');
  //    $(document.createElement("form")).attr({
  //      class:  'form-horizontal'
  //    })
  //  );

  var taskDetailsContainer2 = $('form#form-details');

  // Task Name Anzeigen
  showKey(taskDetailsContainer2, 'Name:', task);
  // Ausgabe der Taskdetails
  for (var index in taskdetail) {
    $.each(taskdetail[index], function(key, value) {
      if(key == 'prio') {
        showKey(taskDetailsContainer2, 'Priorität:', value);
      } else if (key == 'date') {
        showKey(taskDetailsContainer2, 'Datum:', value);
      } else if (key == 'tag') {
        showKey(taskDetailsContainer2, '#Tag:', value);
      }
    });
  }

  taskDetailsContainer2.append(
      $(document.createElement("p"))
      );
  
  // Erledigt Button nur anzeigen falls der Task noch nicht erledigt ist
  if(taskdetail[0].status == false) {
  taskDetailsContainer2.append(
      $(document.createElement("button")).attr({
        class:  'btn btn-success',
        href:   '#',
      }).text("Erledigt")
      .click(function(event) {
        setStatus(task, true);
        removeTask();
        hideTaskDetails(task);
        showTaskDetails(task);
      })
      );
  }

  taskDetailsContainer2.append(
      $(document.createElement("button")).attr({
        class:  'btn',
        href:   '#',
      }).text("Bearbeiten")
      .click(function(event) {
        editTask(task);
      })
      );

  taskDetailsContainer2.append(
      $(document.createElement("button")).attr({
        class:  'btn btn-danger',
        href:   '#',
      }).text("Löschen")
      .click(function(event) {
        delTask(task);
        removeTask();
        hideTaskDetails();
      })
      );

  taskDetailsContainer2.append('</div>');
  taskDetailsContainer2.append('</fieldset>');
  taskDetailsContainer2.append('</form>');
  taskDetailsContainer2.append('</div>');
}

function hideTaskDetails() {
  $("div#taskdetails2").remove();
}

function removeTask() {
  $("div#removeme").remove();
  loadTasklist();
}
