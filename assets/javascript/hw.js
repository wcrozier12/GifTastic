window.onload = function() {

var animals = ['dog', 'cat', 'bird', 'fish'];

function defaultButtons(){
  for (var j=0; j<animals.length; j++){
    var newButton = $('<button>');
    newButton.attr('data', animals[j]);  
    newButton.addClass('gif');
    newButton.html(animals[j]);
    $('#buttonHolder').append(newButton); 
  };
};

function makeButton() {
  var userInput = $('input:text').val();
  var newButton = $('<button>');
  newButton.attr('data', userInput);  
  newButton.addClass('gif');
  newButton.html(userInput);
  $('#buttonHolder').append(newButton); 
};


$('#searchButton').on('click', function(event) {
  event.preventDefault(event);
    if ($('input:text').val() != '') {
      makeButton(); 
      $('input:text').val('');
    };
});

function displayGif() {
  $('#gifHolder').html('');
  event.preventDefault();
  var data = $(this).attr("data");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        data + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      results = response.data;
      for (var i=0; i < results.length; i++) {
        var gifDiv = $('<div>');
        var gifImg = $('<img>'); 
        var p = $('<p>');
        p.text("Rating: " + results[i].rating.toUpperCase());
        gifImg.addClass('gifImg');
        gifImg.attr('src', results[i].images.original_still.url);
        gifImg.attr('data-still', results[i].images.original_still.url);
        gifImg.attr('data-animate', results[i].images.original.url);
        gifImg.attr('data-state', 'still');
        gifDiv.append(p);
        gifDiv.append(gifImg);
        gifDiv.css('display', 'inline-block');
        gifDiv.css('margin', '10px');
        $('#gifHolder').append(gifDiv);
      };
    });
}; 

function pauseGif() {
  state = $(this).attr('data-state');
    if(state === 'still') {
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');
    }
    else if(state === 'animate') {
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    };
};

defaultButtons();
$(document).on("click", ".gif", displayGif);
$(document).on("click", ".gifImg", pauseGif);
};
