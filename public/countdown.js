$(document).ready(function() {
    var index;
    var mode;
    var letters;
    var animation;
    
    resetGame();
    mode = 4;
    
    $("#menu_letters").click(function(){
        setGameType(true);
    });

    $("#menu_numbers").click(function(){
        setGameType(false);
    });

    function setNextLetter(vowel) {
        if (index == 9) mode = 0;
        if (index > 9) {
            return;
        }

        var element = $("#letter" + index);
        var letter = getLetter(vowel);
        element.text(letter);

        index++;
    }

    function getLetter(vowel) {
        var available = [];

        if (vowel) {
            available = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "i", "i", "i", "i", "i", "i", "i", "i", "i", "o", "o", "o", "o", "o", "o", "o", "o", "u", "u", "u", "u"];
        } else {
            available = [ "b", "b", "c", "c", "d", "d", "d", "d", "f", "f", "g", "g", "g", "g", "h", "h", "j", "k", "l", "l", "l", "l", "m", "m", "n", "n", "n", "n", "n", "n", "p", "p", "q", "r", "r", "r", "r", "r", "r", "s", "s", "s", "s", "t", "t", "t", "t", "t", "t", "v", "v", "w", "w", "x", "y", "y", "z"];
        }

        var number = Math.floor(Math.random() * available.length);
        letters[index] = available[number].toUpperCase();
        return letters[index];
    }

    var seconds = 0;
    var timer;

    function startTimer() {
        if (mode == 4) return;  
        
        if (mode == 2) {
            mode = 0;
            resetGame();
            return;
        } else if (mode == 1) {
            animation.kill();
            mode = 2;
            clearInterval(timer);
            return;
        } else {
            mode = 1;
        }
        
        animation = TweenLite.to($('#hand-img'), 30, { rotation: 180 , ease: Linear.easeNone, onComplete: timerEnd});
        var audio = new Audio('assets/theme.m4a');
        audio.play();

        timer = setInterval(function() {
        }, 1000);
    };

    function timerEnd(e) {
        mode = 2;
        clearInterval(timer);
    }

    function resetGame() {
        seconds = 0;
        letters = [];
        index = 1;
        for (var i = 1; i <= 9; i++) {
            $('#letter' + i).text('');
        }

        TweenLite.to($('#hand-img'), 1, { rotation: 0 , ease: Linear.easeNone});
    }

    function findWords() {
        var word = "";
        letters.forEach(function(x) {
            word = word.concat(x);
        });
        
        $.ajax({url: "/api/"+word, success: function(result){
            console.log(result);
        }, error: function (request, status, error) {
            console.log(request.responseText);
        }});
    }

    function setGameType(isLetters) {
        var path = '';
        
        if (isLetters) {
            path = 'letters.html';
        } else {
            path = 'numbers.html';
        }

        $.ajax({url: path, success: function(result){
            $('.game-container').html(result);

            if (letters) {
                $("#vowel").click(function(){ setNextLetter(true); });
                $("#consonant").click(function(){ setNextLetter(false); });
                $('#start').click(startTimer);
                $('#find-words').click(findWords);
            }

        }, error: function (request, status, error) {
            console.log(request.responseText);
        }});
    }
});