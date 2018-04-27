$(document).ready(function() {
  let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let state = 1;
  const player = (name, mark) => {
    return {name, mark};
  }

  let player1;
  let player2;

  $('#form1').on('submit',(event) => {
    event.preventDefault();
    let e = document.getElementById('select1');
    let select = e.options[e.selectedIndex].value;
    let name = document.getElementById("name1").value;
    if (name === "") {
      alert("name can't be blank");
    }
    else {
      player1 = player(name, select);
      $('#player1').addClass('hidden');
      $('#player2').removeClass('hidden');
      let value = player1.mark == "X" ? "O" : "X";
      let option = document.createElement('option');
      option.value = value;
      option.innerHTML = value;
      document.getElementById('select2').appendChild(option);
    }
  });

  $('#form2').on('submit',(event) => {
    event.preventDefault();
    let name = document.getElementById('name2').value;

    if (name == "") {
      alert("Name can't be blank");
    }
    else {
      let select_value = player1.mark == "X" ? "O" : "X";
      player2 = player(name, select_value);
      $('#player2').addClass('hidden');
      $('table').removeClass('hidden');
    }
  });

  function winning(board, player) {
    if (
      (board[0] == player && board[1] == player && board[2] == player) ||
      (board[3] == player && board[4] == player && board[5] == player) ||
      (board[6] == player && board[7] == player && board[8] == player) ||
      (board[0] == player && board[3] == player && board[6] == player) ||
      (board[1] == player && board[4] == player && board[7] == player) ||
      (board[2] == player && board[5] == player && board[8] == player) ||
      (board[0] == player && board[4] == player && board[8] == player) ||
      (board[2] == player && board[4] == player && board[6] == player)
    ) {
      return true;
    } else {
      return false;
    }
  };

  function avail(reboard) {
    return reboard.filter(e => e != "X" && e != "O");
  };

  function reset() {
    state = 1;
    board = [1, 2, 3 ,4 ,5 ,6 , 7, 8];
    $('td').html("");
  }

$('td').on('click', function() {
  let id = $(this).attr('id');
  if (board[id] != "X" && board[id] != "O") {
    if (state == 1) {
      $(this).html(player1.mark);
      board[id] = player1.mark;
      state = 2;

      if (winning(board, player1.mark)) {
        setTimeout(() => {
          alert(player1.name + ' win');
          reset();
        },100)
      }
      else if (avail(board).length == 0) {
        setTimeout(function() {
          alert("This is a tie");
          reset();
        },100);
      }
    }
    else {
      $(this).html(player2.mark);
      board[id] = player2.mark;
      state = 1;

      if (winning(board, player2.mark)) {
        setTimeout(() => {
          alert(player2.name + ' win');
          reset();
        },100)
      }
    }
  }
});

});