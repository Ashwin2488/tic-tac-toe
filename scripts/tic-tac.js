(function ($) {

  var currentPlayer = 'X',
    gameAssistant = {},
    noSquares = 3,
    playerMoveMap = {},
    totalPlayerMoves = 0;

  gameAssistant.bindEvents = function () {
    var self = this;

    $('.tic-tac-board ul').on('click', 'li', function (event) {
      self.updateBoard(event);
    });
    $('#new-game').on('click', function (event) {
      self.resetGame();
    });
  };
  gameAssistant.checkForDraw = function () {

    return totalPlayerMoves === noSquares * noSquares;
  };
  gameAssistant.checkForWin = function (winCondition) {

    return winCondition === noSquares;

  };
  gameAssistant.calculateSquarePosition = function (index) {
    var row = Math.ceil(index / noSquares),
      col = index % noSquares;
    col = col === 0 ? noSquares : col;
    return {
      row: row,
      col: col
    };
  };
  gameAssistant.init = function () {
    this.bindEvents();

  };
  gameAssistant.resetGame = function () {
    currentPlayer = 'X';
    $('.tic-tac-board ul li').removeClass('player-X player-O');
    playerMoveMap = {};
    totalPlayerMoves = 0;
  };
  gameAssistant.switchPlayer = function () {

    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
  };

  gameAssistant.updateBoard = function (event) {
    var $squareEl = $(event.target);

    if ($squareEl.hasClass('player-X') || $squareEl.hasClass('player-O')) {
      return;
    }
    $squareEl.addClass('player-' + currentPlayer);
    this.updatePlayerMove($squareEl.index() + 1);
  };

  gameAssistant.updatePlayerMove = function (index) {
    var getSqPos = this.calculateSquarePosition(index);
    totalPlayerMoves += 1;
    if (!playerMoveMap[currentPlayer]) {
      playerMoveMap[currentPlayer] = {
        'row': {},
        'col': {},
        'd1': 0,
        'd2': 0
      };
    }

    if (!playerMoveMap[currentPlayer].row[getSqPos.row]) {
      playerMoveMap[currentPlayer].row[getSqPos.row] = 0;
    }
    playerMoveMap[currentPlayer].row[getSqPos.row] += 1;
    if (this.checkForWin(playerMoveMap[currentPlayer].row[getSqPos.row])) {
      alert('Player ' + currentPlayer + ' wins!');
      this.updateScore();
      this.resetGame();
      return;
    }

    if (!playerMoveMap[currentPlayer].col[getSqPos.col]) {
      playerMoveMap[currentPlayer].col[getSqPos.col] = 0;
    }
    playerMoveMap[currentPlayer].col[getSqPos.col] += 1;
    if (this.checkForWin(playerMoveMap[currentPlayer].col[getSqPos.col])) {
      alert('Player ' + currentPlayer + ' wins!');
      this.updateScore();
      this.resetGame();
      return;
    }

    if (getSqPos.row === getSqPos.col) {
      playerMoveMap[currentPlayer].d1 += 1;
      if (this.checkForWin(playerMoveMap[currentPlayer].d1)) {
        alert('Player ' + currentPlayer + ' wins!');
        this.updateScore();
        this.resetGame();
        return;
      }

    }

    if ((getSqPos.col + getSqPos.row) === (noSquares + 1)) {
      playerMoveMap[currentPlayer].d2 += 1;
      if (this.checkForWin(playerMoveMap[currentPlayer].d2)) {
        alert('Player ' + currentPlayer + ' wins!');
        this.updateScore();
        this.resetGame();
        return;
      }
    }

    if (this.checkForDraw()) {
      alert('Match Drawn!');
      this.resetGame();
      return;
    }
    this.switchPlayer();

  };

  gameAssistant.updateScore = function () {
    var $playerEl = $('.player-' + currentPlayer + '-score');
    var score = Number($playerEl.text()) + 1;
    $playerEl.html(score);

  };


  gameAssistant.init();

}(jQuery));