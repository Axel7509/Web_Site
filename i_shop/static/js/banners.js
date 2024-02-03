var intervalId;
var intervalInput = 2;
intervalInput = document.getElementById('interval');

function startCarousel() {
  var banners = document.getElementsByClassName('banner');
  var currentIndex = 0;
  var interval = parseInt(intervalInput.value) * 1000;

  function showBanner(index) {
    for (var i = 0; i < banners.length; i++) {
      banners[i].style.display = 'none';
    }
    banners[index].style.display = 'block';
  }

  function rotateBanner() {
    showBanner(currentIndex);
    currentIndex = (currentIndex + 1) % (banners.length);
  }

  function startRotation() {
    intervalId = setInterval(rotateBanner, interval);
  }

  function stopRotation() {
    clearInterval(intervalId);
  }

  // Обработчик события фокуса страницы
  function handlePageFocus() {
    startRotation();
  }

  // Обработчик события потери фокуса страницы
  function handlePageBlur() {
    stopRotation();
  }

  // Добавляем обработчики событий
  window.addEventListener('focus', handlePageFocus);
  window.addEventListener('blur', handlePageBlur);

  // Запускаем смену баннеров
  startRotation();
}

function stopCarousel() {
  clearInterval(intervalId);
  window.removeEventListener('focus', handlePageFocus);
  window.removeEventListener('blur', handlePageBlur);
}

function setIntervalValue() {
  stopCarousel();
  startCarousel();
}

startCarousel();