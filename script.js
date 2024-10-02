$(document).ready(function() {
    const targetNumber = Math.floor(Math.random() * 100) + 1;
    let attemptsLeft = 7;

    $('#submit').click(function() {
        const userGuess = parseInt($('#guess').val());
        if (isNaN(userGuess)) {
            $('#message').text("Please enter a valid number.");
            return;
        }

        if (userGuess === targetNumber) {
            fetchQuote();
        } else {
            attemptsLeft--;
            if (attemptsLeft <= 0) {
                $('#message').text("Better try again! The number was " + targetNumber);
                $('#attempts').hide();
            } else {
                $('#message').text(userGuess < targetNumber ? "It's higher!" : "It's lower!");
                $('#attempts').text("Attempts left: " + attemptsLeft);
            }
        }

        $('#guess').val('');
    });

    function fetchQuote() {
        $.get('https://catfact.ninja/fact')
            .then(data => {
                $('#message').text("Correct! " + data.fact);
                $('#attempts').hide();
            })
            .fail(() => {
                $('#message').text("Failed to fetch a cat fact.");
            });
    }
    
});

