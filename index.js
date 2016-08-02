
function handleClick () {
  var el = document.getElementsByClassName("player")[0].value;
  window.location = "/name/" + el;
}

document.addEventListener("DOMContentLoaded", function (event) {
  console.log('DOM Fully Loaded');

  var input = document.getElementsByClassName("player")[0];
  var nameList, timer;

  input.addEventListener("keyup", function (e) {
    if (this.value.length > 2) {
      searchName(this.value);
    } else {
      document.getElementsByClassName("autocomplete")[0].innerHTML = "";
    }
  });

  var autocompleteList = document.getElementsByClassName('autocomplete')[0];
  autocompleteList.addEventListener('click', function (e) {
    var endOfName, playerName;

    endOfName = e.target.innerHTML.indexOf("(") - 1;
    playerName = e.target.innerHTML.slice(0, endOfName);
    document.getElementsByClassName("player")[0].value = playerName;
  });

});

function searchName(query) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', encodeURI('/search/' + query));
  xhr.onload = function() {
    if (xhr.status === 200) {
      nameList = JSON.parse(this.response);
      document.getElementsByClassName("autocomplete")[0].innerHTML = "<li>Player Name (Real Name)</li>";
      for (var i = 0; i < nameList.length; i++) {
        if (nameList[i][1] === null) {
          nameList[i][1] = "N/A";
        }
        var player = ("<li>" + nameList[i][0] + " (" + nameList[i][1] + ") </li>");
        document.getElementsByClassName("autocomplete")[0].innerHTML += player;
      }
    }
    else {
      alert('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send();
}

document.addEventListener("click", function () {
  document.getElementsByClassName("autocomplete")[0].innerHTML = "";
});
