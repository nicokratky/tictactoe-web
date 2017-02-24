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
        }
        else if(round > 8) {
            alert('TIE!');
            reset();
        }
        else {
            // TODO
        }
    }
    else {
        console.log('Cell ' + id + ' is occupied!');
    }
}

function winning(board, player) {
    if((board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player))
        return true;
    return false;
}
