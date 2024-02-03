//----4
const formCard = document.querySelector('.form-card');

formCard.addEventListener('mousemove', function(e) {
  const cardWidth = this.offsetWidth;
  const cardHeight = this.offsetHeight;
  const xAxis = (cardWidth / 2 - e.pageX) / 10;
  const yAxis = (cardHeight / 2 - e.pageY) / 10;

  this.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

formCard.addEventListener('mouseleave', function() {
  this.style.transform = 'rotateY(0deg) rotateX(0deg)';
});

const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Предотвращаем отправку формы по умолчанию

  // Получаем значения полей формы
  const name = document.querySelector('input[name="name"]').value;
  const email = document.querySelector('input[name="email"]').value;

  // Выполняем действия с полученными значениями (например, отправка данных на сервер)
  console.log('Name:', name);
  console.log('Email:', email);

  // Очищаем поля формы
  form.reset();
});

//----5

const settingsForm = document.getElementById('settings-form');

    settingsForm.addEventListener('change', function() {
      const fontSizeCheckbox = settingsForm.elements['font-size'];
      const textColorCheckbox = settingsForm.elements['text-color'];
      const backgroundColorCheckbox = settingsForm.elements['background-color'];

      if (fontSizeCheckbox.checked) {
        document.body.style.fontSize = '20px';
      } else {
        document.body.style.fontSize = '16px';
      }

      if (textColorCheckbox.checked) {
        document.body.style.color = '#FF0000';
      } else {
        document.body.style.color = '#000000';
      }

      if (backgroundColorCheckbox.checked) {
        document.body.style.backgroundColor = '#FFFF00';
      } else {
        document.body.style.backgroundColor = '#FFFFFF';
      }
    });


    //-------7

      // Запрос даты рождения у пользователя
  const birthDate = prompt('Введите вашу дату рождения в формате ДД.ММ.ГГГГ', '');

  if (!birthDate) {
    // Переходим на главную страницу
    window.location.href = '/';
  } else {
      // Разбиваем введенную дату на день, месяц и год
      const [day, month, year] = birthDate.split('.');

      // Создаем объект даты из введенной информации
      const birthday = new Date(year, month - 1, day);

      // Получаем текущую дату
      const currentDate = new Date();

    // Рассчитываем количество лет
    const age = Math.floor((currentDate - birthday) / (1000 * 60 * 60 * 24 * 365));

    // Проверяем, является ли пользователь совершеннолетним
    if (age >= 18) {
      // Определяем день недели введенной даты рождения
      const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
      const birthDayOfWeek = daysOfWeek[birthday.getDay()];

      // Выводим сообщение о дне недели введенной даты для совершеннолетних
      alert(`Вы совершеннолетний(-ая). День недели вашей даты рождения: ${birthDayOfWeek}.`);
    } else {
      // Выводим предупреждение о необходимости разрешения родителей для несовершеннолетних
      alert('Вы несовершеннолетний(-ая). Для использования сайта требуется разрешение родителей.');
      window.location.href = '/';
    }
  }