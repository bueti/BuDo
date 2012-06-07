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
    }
  });  
});  

function init() {
  // Set Focus to Input
  $('input#formTask').focus();

  // Show all current Tasks and sort by name
  showTasks();

  // ActionListeners for the sort radio buttons
  $("input[id=tagPrio]").click(function() {
    removeTasklist();
    showTasks('tag');
  });
  $("input[id=datePrio]").click(function() {
    removeTasklist();
    showTasks('date');
  });
  $("input[id=prioRadio]").click(function() {
    removeTasklist();
    showTasks('prio');
  });
  $("input[id=namePrio]").click(function() {
    removeTasklist();
    showTasks('name');
  });
}

