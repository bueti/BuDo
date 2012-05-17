$(function() {  
  $(".btn").click(function() {  
    // validate and process form here  
    //

    var taskname = $("#formTask").val();  
    var prio = $("#formPrio").val();  
    var date = $("#datepicker").val();  
    var tag = $("#formTag").val();

    if (taskname) {
      addTask(taskname);

      save(taskname, prio, date, tag)
    }
    return false; 
  });  
});  

function init() {
  loadTasklist();
}

function addTask(task) {
  var taskContainer = $('ul#tasklist');
  taskContainer.append(
      $(document.createElement("li"))
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
              var c = this.checked ? showTaskDetails(task) : hideTaskDetails(task);
            })
          )
        )
      )
  );
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
      alert("Erledigt");
      })
    );

  taskDetailsContainer2.append(
      $(document.createElement("button")).attr({
        class:  'btn btn-danger span2',
        href:   '#',
      }).text("Löschen")
      .click(function(event) {
        delTask(task);
        removeTaskliste();
        loadTasklist();

      })
    );
  taskDetailsContainer2.append('</div>');
}

function hideTaskDetails(task) {
  $("div#taskdetails2").remove();
}

function removeTaskliste() {
  $("ul#tasklist").remove();
}
