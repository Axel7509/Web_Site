// // Базовый класс "Product" (Товар)
// function Product(name, price) {
//     this.name = name;
//     this.price = price;
//   }
  
//   Product.prototype.getName = function() {
//     return this.name;
//   };
  
//   Product.prototype.setName = function(name) {
//     this.name = name;
//   };
  
//   Product.prototype.getPrice = function() {
//     return this.price;
//   };
  
//   Product.prototype.setPrice = function(price) {
//     this.price = price;
//   };
  
//   // Класс-наследник "Book" (Книга)
//   function Book(name, price, author) {
//     Product.call(this, name, price);
//     this.author = author;
//   }
  
//   Book.prototype = Object.create(Product.prototype);
//   Book.prototype.constructor = Book;
  
//   Book.prototype.getAuthor = function() {
//     return this.author;
//   };
  
//   Book.prototype.setAuthor = function(author) {
//     this.author = author;
//   };
  
//   // Создаем экземпляр класса "Book" и демонстрируем его возможности
//   const book = new Book('The Catcher in the Rye', 10.99, 'J.D. Salinger');
//   console.log(book.getName());  // Выводит: The Catcher in the Rye
//   console.log(book.getPrice()); // Выводит: 10.99
//   console.log(book.getAuthor()); // Выводит: J.D. Salinger
  
//   book.setPrice(12.99);
//   console.log(book.getPrice()); // Выводит: 12.99
  
//   // Декоратор для функции getPrice()
//   function priceDecorator(fn) {
//     return function() {
//       const price = fn.apply(this, arguments);
//       return `$${price.toFixed(2)}`;
//     };
//   }
  
//   // Применяем декоратор к функции getPrice() класса "Book"
//   Book.prototype.getPrice = priceDecorator(Book.prototype.getPrice);
  
//   console.log(book.getPrice()); // Выводит: $12.99 (с добавленным декоратором)


// Базовый класс "Product" (Товар)
class Product {
    constructor(name, price) {
      this.name = name;
      this.price = price;
    }
  
    getName() {
      return this.name;
    }
  
    setName(name) {
      this.name = name;
    }
  
    getPrice() {
      return this.price;
    }
  
    setPrice(price) {
      this.price = price;
    }
  }
  
  // Класс-наследник "Book" (Книга)
  class Book extends Product {
    constructor(name, price, author) {
      super(name, price);
      this.author = author;
    }
  
    getAuthor() {
      return this.author;
    }
  
    setAuthor(author) {
      this.author = author;
    }
  }
  
  // Создаем экземпляр класса "Book" и демонстрируем его возможности
  const book = new Book('The Catcher in the Rye', 10.99, 'J.D. Salinger');
  console.log(book.getName());  // Выводит: The Catcher in the Rye
  console.log(book.getPrice()); // Выводит: 10.99
  console.log(book.getAuthor()); // Выводит: J.D. Salinger
  
  book.setPrice(12.99);
  console.log(book.getPrice()); // Выводит: 12.99
  
  // Декоратор для функции getPrice()
  function priceDecorator(fn) {
    return function() {
      const price = fn.apply(this, arguments);
      return `$${price.toFixed(2)}`;
    };
  }
  
  // Применяем декоратор к функции getPrice() класса "Book"
  Book.prototype.getPrice = priceDecorator(Book.prototype.getPrice);
  
  console.log(book.getPrice()); // Выводит: $12.99 (с добавленным декоратором)