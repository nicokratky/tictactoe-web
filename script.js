$(document).ready(function() {

    $('#option1').click(function() {
        humanColor = '#e74c3c';
        aiColor = '#3498db';

        $('#question, .options').css('display', 'none');
        $('#main-heading, table').css('display', 'block');
    });

    $('#option2').click(function() {
        humanColor = '#3498db';
        aiColor = '#e74c3c';

        $('#question, .options').css('display', 'none');
        $('#main-heading, table').css('display', 'block');
    });

    $('td.cell').click(function() {
        move(this, human, humanColor);
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
            setTimeout(function() {
                alert('YOU WIN!');
                reset();
            }, 300);
            return;
        }
        else if(round > 8) {
            setTimeout(function() {
                alert('TIE!');
                reset();
            }, 300);
            return;
        }
        else {
            round++;
            var index = minimax(board, ai).index;
            var selector = '#c' + index;
            $(selector).css('background', aiColor);

            board[index] = ai;

            if(winning(board, ai)) {
                setTimeout(function() {
                    alert('YOU LOSE!');
                    reset();
                }, 300);
                return;
            }

        }
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
    $('.cell').css('background', 'transparent');
}

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
    for(var i = 0; i < av.length; i++) {
        var move = {
            index: _board[av[i]]
        };

        _board[av[i]] = player;

        var mm;
        if(player == ai)
            mm = minimax(_board, human);
        else
            mm = minimax(_board, ai);

        move.score = mm.score;
        _board[av[i]] = move.index;
        moves.push(move);
    }

    var bestMove, bestScore;
    if(player == ai) {
        bestScore = -99999;

        for(var i = 0; i < moves.length; i++) {
            if(moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    else {
        bestScore = 99999;

        for(var i = 0; i < moves.length; i++) {
            if(moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}

function available(_board) {
    return _board.filter(s => (s != human && s != ai));
}
