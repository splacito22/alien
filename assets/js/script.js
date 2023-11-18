$(function () {
  function saveEvent(hour, eventText) {
    localStorage.setItem("event-" + hour, eventText);
    var eventText = localStorage.getItem("event-" + hour);
  }

  $(".saveBtn").on("click", function () {
    var eventId = $(this).closest(".time-block").attr("id");
    var eventText = $(this).siblings("textarea").val();

    saveEvent(eventId, eventText);
  });
  //Function to get any user input saved in local storage and set text area values
  function loadEvents() {
    $(".time-block").each(function () {
      var hour = $(this).attr("id").split("-")[1];
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

  function displayCurrentDate() {
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDate);
  }

  displayCurrentDate();
  loadEvents();
  applyTimeBlockStyles();
});
