//----3
window.addEventListener('scroll', function() {
    var container = document.getElementById('container');
    var store = document.getElementById('store');
    var runner = document.getElementById('runner');

    var containerHeight = container.offsetHeight;
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    var storePosition = containerHeight / 2;
    var runnerPosition = (scrollPosition / containerHeight) * 100;

    store.style.top = storePosition + 'px';
    runner.style.left = runnerPosition + '%';
  });
