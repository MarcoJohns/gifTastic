var topics = ["animals", "excited", "sleepy", "good morning", "the office"];

function topicButtons() {

    $("#topic-buttons").empty()

    for (var i = 0; i < topics.length; i++) {

        var button = $("<button>");
        button.addClass("topics");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);

        $("#topic-buttons").append(button);
    }
}
topicButtons()

$("#topic-buttons").on("click", ".topics", function() {
    
    $("#click-to-animate").show()

    var userClick = $(this).attr("data-name")

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userClick + "&api_key=9DAFL0tRH2jAJGtMuPuZAgEo2Dfqix87&limit=9&rating=G";

    $.ajax({
        url:queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data

        for (var i = 0; i < response.data.length; i++) {
            var img = $("<img src=" + response.data[i].images.fixed_width_still.url + ">");

            $("#gif-view").append(img);
            var p = $("<p>").text("Rating: " + results[i].rating);

            $("#gif-view").append(results[i].rating)

            img.attr("data-still", response.data[i].images.fixed_width_still.url);
            img.attr("data-animate", response.data[i].images.fixed_width.url)
            img.attr("data-state", "still")
        }
    })

    $("#gif-view").empty();
    $("#gif-view").append(img, newSearch);
})

$("#gif-view").on("click", "img", function() {

    var state = $(this).attr("data-state");

    console.log("It's Working")

    if (state === "still") {

        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate")

    } else {

        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})

$("add-giphy").on("click", function(event) {

    event.preventDefault();

    var newSearch = $("movie-input").val().trim()

    topics.push(newsearch);

    topicButtons();

});