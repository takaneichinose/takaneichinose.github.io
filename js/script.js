var statBars = document.querySelectorAll('.stat-bar');

function setStatThread(i) {
  setTimeout(function () {
    statBars[i].classList.add('stat-' + statBars[i].getAttribute('data-stat'));
    if (i < statBars.length) {
      setStatThread(i + 1);
    }
  }, 200);
}

setTimeout(function () {
  setStatThread(0);
}, 500);

