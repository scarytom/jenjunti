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

  function addTestRow(testClass, testMethod, testDuration) {
    var row = $("<tr></tr>");
    row.append($("<td></td>").text(testDuration));
    row.append($("<td></td>").text(testClass));
    row.append($("<td></td>").text(testMethod));

    $("#analysis-data").append(row);
  }

  function clear() {
    $("#totalTime").val(0);
    $("#totalTestCount").val(0);
    $("#analysis-data").empty();
    $("#log").empty();
  }

  function analyse(data) {
    var testData = [], sum = 0;
    totals(data.duration, data.passCount + data.failCount);
    $.each(data.suites, function(suiteIndex, suite) {
      $.each(suite.cases, function(caseIndex, testcase) {
        testData.push({
          "testClass": testcase.className,
          "testMethod": testcase.name,
          "testDuration": testcase.duration
        });
      });
    });

    testData.sort(function(a, b) {
      if (a.testDuration !== b.testDuration) {
        return b.testDuration - a.testDuration;
      }
      if (a.testClass !== b.testClass) {
        return a.testClass - b.testClass;
      }
      return a.testMethod - b.testMethod;
    });

    $.each(testData, function(index, datum) {
      addTestRow(datum.testClass, datum.testMethod, datum.testDuration);
      sum += datum.testDuration;
    });
    alert(sum);
  }

  function go() {
    var url = $("#url").val() + "/job/" + $("#target").val() + "/lastCompletedBuild/testReport/api/json?jsonp=?";
    $.getJSON(url, analyse);
  }

  $("#go-button").click(go);
  clear();
});
