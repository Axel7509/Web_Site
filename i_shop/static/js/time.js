
const countdownElement = document.getElementById('countdown');

  function updateCountdown() {
    const currentTime = new Date().getTime();

    let countdownEndTime = localStorage.getItem('countdownEndTime');
    if (!countdownEndTime) {
      countdownEndTime = currentTime + (60 * 60 * 1000);
      localStorage.setItem('countdownEndTime', countdownEndTime);
    }

    const timeRemaining = countdownEndTime - currentTime;

    if (timeRemaining <= 0) {
      countdownElement.textContent = 'Время истекло!';
      // Обновляем время окончания отсчета в Local Storage
      localStorage.removeItem('countdownEndTime');
      // Перезагружаем страницу через 1 секунду
      setTimeout(function() {
        location.reload();
      }, 1000);
    } else {
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      countdownElement.textContent = `Осталось: ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      setTimeout(updateCountdown, 1000);
    }
  }

  updateCountdown();
