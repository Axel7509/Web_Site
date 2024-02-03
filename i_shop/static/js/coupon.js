const promoCodeInput = document.getElementById('promo-code-input');
  const promoCodeButton = document.getElementById('promo-code-button');
  const totalAmountElement = document.getElementById('total-amount');

  promoCodeButton.addEventListener('click', function() {
    const promoCode = promoCodeInput.value.trim(); // Получаем значение введенного промокода

    const promoCodes = {
      'PROMO456': 0.8, 
      'ABC12345': 0.5, 
      'XYZ67890': 0.3 
    };

    if (promoCode in promoCodes) {
      const discount = promoCodes[promoCode]; // Получаем скидку для введенного промокода
      const currentTotal = parseFloat(totalAmountElement.textContent.replace('$', '')); // Получаем текущую общую стоимость
      const discountedTotal = currentTotal * discount; // Применяем скидку к общей стоимости

      // Обновляем текст общей стоимости с учетом примененной скидки
      totalAmountElement.textContent = '$' + discountedTotal.toFixed(2);

      // Здесь можно добавить другие действия при успешном применении промокода, например, отображение сообщения об успешной скидке.
    } else {
      // Здесь можно добавить обработку случая, когда промокод недействителен или не найден, например, отображение сообщения об ошибке.
    }
  });