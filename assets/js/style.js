// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html

$(function () {
  //Variables
  var startTime = 9;
  var endTime = 17;
  var container = $(".container-lg");
  var currentHour = dayjs().hour();

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  function saveEvent(hour, eventText) {
    localStorage.setItem("event-" + hour, eventText);
  }
  //Function to get any user input saved in local storage and set text area values
  function loadEvents() {
    $(".time-block").each(function () {
      var hour = $(this).attri("id").split("-")[1];
      var eventText = localStorage.getItem("event-" + hour);

      if (eventText) {
        $(this).find(".description").val(eventText);
      }
    });
  }

  function applyTimeBlockStyles() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var hour = parseInt($(this).attr("id").split("-")[1]);

      if (hour < currentHour) {
        $(this).addClass("past").removeClass("present future");
      } else if (hour === currentHour) {
        $(this).addClass("present").removeClass("past future");
      } else {
        $(this).addClass("future").removeClass("past present");
      }
    });
  }

  // TODO: Add code to display the current date in the header of the page.
  function displayCurrentDate() {
    var currentDate = dayjs().format("DDDD, MMMM D");
    $("#currentDay").text(currentDate);
  }
});
