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
  var taskContainer = $('ul#tasklist');
  var myTask = getStoreArray(task);

  if (myTask[0].status) {
    taskContainer.append(
        $(document.createElement("li")).attr({
          id:     'task',
          class:  'task-done'
        })
        .append(
          $(document.createElement("div")).attr({
            class:  'controls',
          })
          .append(
            $(document.createElement("label")).attr({
              class:  'checkbox',
            })
            .text(task)
            .append(
              $(document.createElement("input")).attr({
                value:  task,
                type:   'checkbox',
              })
              .change(function() {
                // Details Anzeigen / Verstecken
                var c = this.checked ? showTaskDetails(task) : hideTaskDetails(task);
              })
              )
            )
          )
          );
  } else {
    taskContainer.append(
        $(document.createElement("li")).attr({
          id:   'task'
        })
        .append(
          $(document.createElement("div")).attr({
            class:  'controls'
          })
          .append(
            $(document.createElement("label")).attr({
              class:  'checkbox'
            })
            .text(task)
            .append(
              $(document.createElement("input")).attr({
                value:  task,
                type:   'checkbox'
              })
              .change(function() {
                // Details Anzeigen / Verstecken
                hideTaskDetails(task);
                var c = this.checked ? showTaskDetails(task) : hideTaskDetails(task);
              })
              )
            )
          )
          );

  }

}

function showTaskDetails(task) {
  var taskDetailsContainer = $('div#taskdetails');
  var taskdetail = getStoreArray(task);

  $("#taskdetails").append('<div id="taskdetails2">');
  var taskDetailsContainer2 = $('div#taskdetails2');

  for (var index in taskdetail) {
    // Ausgabe der Taskdetails
    $.each(taskdetail[index], function(key, value) {
        taskDetailsContainer2.append(
          $(document.createElement("li"))
          .append(
            key + ": " + value
            )
          )
    }
    );
  }

  taskDetailsContainer2.append(
      $(document.createElement("button")).attr({
        class:  'btn btn-success span2',
        href:   '#',
      }).text("Erledigt")
    .click(function(event) {
      setStatus(task, true);
      removeTask();
      loadTasklist();

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
        loadTasklist();
        hideTaskDetails();
      })
    );
  taskDetailsContainer2.append('</div>');
}

function hideTaskDetails() {
  $("div#taskdetails2").remove();
}

function removeTask() {
  $("li#task").remove();
}
