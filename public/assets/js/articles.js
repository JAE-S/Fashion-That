  // ========================================================== //
 //                       Controllers                          //
// ========================================================== //

// Grab the articles as a json
// =========================================================

$.getJSON("/articles", function(data) {
   
    // For each one
    for (var i = 0; i < data.length; i++) {
        var container = $('<div class="card darken-1">');
        container.append($("<div class='card-content' />")
            .append('<div class="z-depth-1 card-title">' + data[i].title + " " + '</div>')
            // .append('<p class="category ">' + data[i].category + " " + '</p>')
            // .append('<p class="date">' + data[i].date + " " + '</p>')
            .append('<class="description">' + data[i].description + " " + '</p>')
            .append("<div class='card-action'>" + "<a data-id='" + data[i]._id + "'>" + "Take Notes" + "</a>" + "</div>"))
            $("#articles").append(container)
    }
  });


  // on Click function for anchor tag 
$(document).on("click", "a", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
    var myFrame = $("#myframe");
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        myFrame.attr('src', data.link)
        // The title of the article
        $("#notes").append("<p class='border-lines'>" + "Notes for: " + data.title + "</p>");
        // An input to enter a new title
        // $("#notes").append("<input id='titleinput' name='title' >");
            
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });