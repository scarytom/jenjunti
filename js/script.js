$(document).ready(function() {
  "use strict";

  function log(message) {
    $("#log").prepend($("<br/>"));
    $("#log").prepend($("<span></span>").text(message));
  }

  function totals(time, count) {
    $("#totalTime").val(time);
    $("#totalTestCount").val(count);
  }

  function addTestRow(testClass, testMethod, time) {
    var row = $("<tr></tr>");
    row.append($("<td></td>").text(testClass));
    row.append($("<td></td>").text(testMethod));
    row.append($("<td></td>").text(time));

    $("#analysis-data").prepend(row);
  }

  function clear() {
    $("#totalTime").val(0);
    $("#totalTestCount").val(0);
    $("#analysis-data").empty();
    $("#log").empty();
  }

  function analyse(data) {

  }

  function go() {
    var url = $("#url").val() + "/job/" + $("#target").val() + "/lastCompletedBuild/testReport/api/json?jsonp=?";
    $.getJSON(url, function(data) {
      analyse(data);
    });
  }

  $("#go-button").click(go);
  clear();
});
