$(document).ready(function() {

    $('#option1').click(function() {
        humanColor = '#e74c3c';
        aiColor = '#3498db';

        console.log("Human player chose RED!");

        $('#question, .options').css('display', 'none');
        $('#main-heading, table').css('display', 'block');
    });

    $('#option2').click(function() {
        humanColor = '#3498db';
        aiColor = '#e74c3c';

        console.log('Human player chose BLUE!');

        $('#question, .options').css('display', 'none');
        $('#main-heading, table').css('display', 'block');
    });

    $('td.cell').click(function() {
        move(this, human, humanColor);
        console.log('Human player clicked cell ' + this.id.substring(1));
    });

});

var board = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8
];

var human = 'X';
var ai = 'O';

var humanColor, aiColor;

var round = 0;

function move(element, player, color) {
    var id = element.id.substring(1);

    if(board[id] != human && board[id] != ai) {
        round++;

        board[id] = player;
        $(element).css('background', color);

        if(winning(board, player)) {
            alert('YOU WIN!');
            reset();
            return;
        }
        else if(round > 8) {
            alert('TIE!');
            reset();
            return;
        }
        else {
            round++;
            var index = minimax(board, ai);
            var selector = '#' + index;
            $(selector).css('background', aiColor);

            board[index] = ai;

            if(winning(board, ai)) {
                alert('YOU LOSE!');
                reset();
                return;
            }

        }
    }
    else {
        console.log('Cell ' + id + ' is occupied!');
    }
}

function winning(_board, player) {
    if((_board[0] == player && _board[1] == player && _board[2] == player) ||
        (_board[3] == player && _board[4] == player && _board[5] == player) ||
        (_board[6] == player && _board[7] == player && _board[8] == player) ||
        (_board[0] == player && _board[3] == player && _board[6] == player) ||
        (_board[1] == player && _board[4] == player && _board[7] == player) ||
        (_board[2] == player && _board[5] == player && _board[8] == player) ||
        (_board[0] == player && _board[4] == player && _board[8] == player) ||
        (_board[2] == player && _board[4] == player && _board[6] == player))
        return true;
    return false;
}

function reset() {
    round = 0;
    board = [
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
    ];
}

var iteration = 0;
function minimax(_board, player) {
    var av = available(_board);

    if(winning(_board, human)) {
        return {
            score: -10
        };
    }
    else if(winning(_board, ai)) {
        return {
            score: 10
        };
    }
    else if(av.length == 0) {
        return {
            score: 0
        };
    }

    var moves = [];
}

function available(_board) {
    return _board.filter(s => (s != human && s != ai));
}
