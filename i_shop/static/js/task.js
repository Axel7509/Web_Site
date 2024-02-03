const cars = [
    { brand: 'BMW', number: 'A123BC', owner: 'Иванов' },
    { brand: 'Mercedes', number: 'B456DE', owner: 'Петров' },
    { brand: 'Toyota', number: 'C789FG', owner: 'Сидоров' },
    { brand: 'BMW', number: 'D987HI', owner: 'Козлов' },
    { brand: 'Audi', number: 'E654KJ', owner: 'Смирнов' }
  ];

  // Функция для поиска фамилий владельцев и номеров автомобилей по заданной марке
  function searchCarsByBrand(brand) {
    const results = cars.filter(car => car.brand === brand);
    return results.map(car => ({ owner: car.owner, number: car.number }));
  }

  // Обработчик события отправки формы
  document.getElementById('carForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем отправку формы

    const carBrand = document.getElementById('carBrand').value;
    const searchResults = searchCarsByBrand(carBrand);

    // Очищаем предыдущие результаты
    document.getElementById('result').innerHTML = '';

    if (searchResults.length > 0) {
      // Выводим результаты
      const resultElement = document.createElement('ul');
      searchResults.forEach(result => {
        const listItem = document.createElement('li');
        listItem.textContent = `Фамилия: ${result.owner}, Номер: ${result.number}`;
        resultElement.appendChild(listItem);
      });
      document.getElementById('result').appendChild(resultElement);
    } else {
      // Если результатов нет, выводим сообщение
      const noResultsMessage = document.createElement('p');
      noResultsMessage.textContent = 'Нет результатов.';
      document.getElementById('result').appendChild(noResultsMessage);
    }
  });