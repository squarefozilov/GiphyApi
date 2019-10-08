$( document ).ready(function() {

  // my array
  var topic = ["Lion","cat","dog","pony","Penguin","cat", "dog", "tiger","horse"];
  
  //function that displays the gif buttons
  
  function displayGifButtons() {
    $("#animaslButtons").empty();
    for (var i = 0; i < topic.length; i++) {
      var gifButton = $("<button>");
      gifButton.addClass("userAn");
      gifButton.addClass("btn btn-primary")
      gifButton.attr("data-name", topic[i]);
      gifButton.text(topic[i]);
      $("#animaslButtons").append(gifButton);
    }
  }
  
  //function to add new button
  
  function addNewButton() {
    $("#addButton").on("click", function() {
      var userAn = $("#itex").val().trim();
      if (userAn == ""){
        return false;//no blank buttons
      }
      topic.push(userAn);
  
      displayGifButtons();
      return false;
      });
  }
  
  //function to remove last button
  function removeLastButton() {
    $("removeGif").on("click", function() {
      topic.pop(lady);
      displayGifButtons();
      return false;
    });
  
  }
  
  // function that displays the gifs
  
  function displayGifs() {
    var userAn = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userAn + "&api_key=dc6zaTOxFJmzC&limit=8";
    
    $.ajax({
      url: queryURL,
      method: 'GET'
    })
  
    .done(function(response) {
      $("#images").empty();
    
      var results = response.data;
      console.log(results);
      for (var i = 0; i<results.length; i++){
        var gifDiv = $("<div1 style='float:left'>");
        var gifRating = $("<p>").text("Rating " + results[i].rating);
        console.log(results[i].title);
        gifDiv.append(gifRating);


        console.log(results[i].images.fixed_height_small_still.url);
        //pull gif
        var gifImage = $("<img>");
        gifImage.attr("src", results[i].images.fixed_height_small_still.url);
        //paused images
        gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
        //animated images
        gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
        //how images come in, already paused
        gifImage.attr("data-state", "still");
        gifImage.addClass("image");
        gifDiv.append(gifImage);
        //add new div to existing divs
        $("#images").prepend(gifDiv);
      }
    });
  }
  
  
   
  displayGifButtons();
  addNewButton();
  removeLastButton();
  
  

  $(document).on("click", ".userAn", displayGifs);
  $(document).on("click", ".image", function() {
    var state = $(this).attr('data-state');
    if (state == 'still') {
      $(this).attr('src', $(this).data('animate'));
      $(this).attr('data-state', 'animate');
    }else {
      $(this).attr('src', $(this).data('still'));
      $(this).attr('data-state', 'still');
    }
  
    });
  
  });
  