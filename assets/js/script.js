$(function () {
  // Function to save an event to local storage
  function saveEvent(hour, eventText) {
    // Set the eventText for the specified hour in local storage
    localStorage.setItem("event-" + hour, eventText);
  }

  // Event handler for the save button click
  $(".saveBtn").on("click", function () {
    // Get the unique identifier (hour) of the clicked time block
    var eventId = $(this).closest(".time-block").attr("id");
    // Get the text entered by the user in the corresponding textarea
    var eventText = $(this).siblings("textarea").val();

    // Call the saveEvent function with the hour and text as parameters
    saveEvent(eventId, eventText);
  });
  // Function to load events from local storage and set textarea values
  function loadEvents() {
    $(".time-block").each(function () {
      // Extract the hour from the time block's id
      var hour = $(this).attr("id").split("-")[1];
      // Retrieve the event text from local storage using a specific key
      var eventText = localStorage.getItem("event-hour-" + hour);

      // Check if there is a saved event text for the current hour
      if (eventText) {
        // Set the textarea value to the retrieved event text
        $(this).find(".description").val(eventText);
      }
    });
  }
  // Function to apply styling to time blocks based on the current hour
  function applyTimeBlockStyles() {
    // Get the current hour using Day.js
    var currentHour = dayjs().hour();

    // Iterate over each time block and apply styling based on the comparison with the current hour
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

  // Function to display the current date in the designated element
  function displayCurrentDate() {
    // Get the current date formatted using Day.js
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    // Set the formatted date in the designated element
    $("#currentDay").text(currentDate);
  }

  // Initial function calls to set up the scheduler
  displayCurrentDate();
  loadEvents();
  applyTimeBlockStyles();
});
