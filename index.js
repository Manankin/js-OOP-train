// 1. Створення базового об'єкту "Book":
/*
 * Об'єкт: Book
 * Властивості:
 * ----------------------------------
 * | Властивість | Значення         |
 * |-------------|------------------|
 * | title       | "Загальна Книга" |
 * | author      | "Анонім"         |
 * | pages       | 0                |
 *
 * Функції:
 * ------------------------------------------------------------------------
 * | Функція    | Опис                                                    |
 * -----------------------------------------------------------------------
 * | read()     | Виводить повідомлення "Ви читаєте <title> від <author>" |
 */

// Створюємо об'єкт Book
const Book = {
    title: "Загальна Книга",
    author: "Анонім",
    pages: 0,
    read() {console.log(`Ви читаєте ${this.title} від ${this.author}`)}
}
console.log("Завдання: 1 ==============================");
// Виводимо в консоль Об'єкт: Book
console.log(Book);
// Виводимо в консоль прототип Об'єкту: Book
console.log(Object.getPrototypeOf(Book)); // для об'єкту Book ппрототипу нема, тому виводиться пустий об'єкт
// Викликаємо функцію read об'єкту Book
Book.read();


// 2. Наслідування від базового об'єкту Book
/** Об'єкт: Novel
 * Властивості та функції наслідуються від об'єкта Book
 * Додаємо нову властивість
 *  | Властивість | Значення |
 *  |-------------|----------|
 *  | genre       | "Новела" |
 */
// Створюємо об'єкт Novel, наслідуємо властивості і функції від об'єкта Book
const novel = Object.create(Book);
// Додаємо властивість genre
novel.genre = "Новела";
console.log("Завдання: 2 ==============================");
// Виводимо в консоль Об'єкт: Novel
console.log(novel);
// Виводимо в консоль прототип Об'єкту: Novel
console.log(Object.getPrototypeOf(novel));


// 3. Створення нового об'єкту та зміна його прототипу
/*
 * Об'єкт: Biography
 * Властивості:
 * --------------------------------------
 * | Властивість | Значення             |
 * |-------------|----------------------|
 * | title       | "Загальна Біографія" |
 * | author      | "Біограф"            |
 * | pages       | 200                  |
 */

// Створюємо об'єкт Biography
const Biography = {
    title: "Загальна Біографія",
    author: "Біограф",
    pages: 200,
}
// Змінемо прототип об'єкта Biography на Novel
Object.setPrototypeOf(Biography, novel);
console.log("Завдання: 3 ==============================");
// Виводимо в консоль Об'єкт: Biography
console.log(Biography);
// Перевіримо чи являється Novel прототипом Biography та виведемо в консоль
console.log(novel.isPrototypeOf(Biography));


// 4. Інкапсуляція властивості та додання властивості
/*
 * Об'єкт: ScienceBook
 * Властивості та функції наслідуються від об'єкта Book
 * Також тут використовується інкапсуляція для створення властивості 'info', яка не може бути змінена напряму, а лише змінюється за допомогю гетера
 */

// Створюємо ScienceBook, наслідуємо властивості і функції від об'єкта Book
const scinceBook = Object.create(Book);
// Додаємо властивість 'info' за допомогою Object.defineProperty
// Object.defineProperty(scinceBook, "info", {
//     value: "",
//     configurable: false,
// })
// Зробимо щоб 'info' не можно було видалити або змінити, перевіримо і спробуємо присвоїти ій будь яке значення (це потрібно робити ззовні defineProperty),
// scinceBook.info = 'This is scince book';    
// Отримаємо помилку Cannot assign to read only property 'info' of object '#<Object>'
// Далі створюємо сетер який присвоє властивості info значення яке отримує при виклику, помилку більше не отримуємо але при спробі вивести значення info отримуємо undefined
Object.defineProperty(scinceBook, "info", {
    set(value) {
        this._info = value;
    },
    // Створимо гетер який буде нам повертати рядок: Про книгу <title>: <info>
    get() {
    return `Про книгу ${this.title}: ${this._info}`
    }
})
// тепер все виводить коректно
// Заповнюємо об'єкт
// | Властивість | Значення             |
// |-------------|----------------------|
// | title       | "Фізика 101"         |
// | author      | "Альберт Ейнштейн"   |
// | info        | написана в 1915 році |
scinceBook.title = "Фізика 101";
scinceBook.author = "Альберт Ейнштейн";
scinceBook.info = "написана в 1915 році";

console.log("Завдання: 4 ==============================");
// Виводимо в консоль властивість info
console.log(scinceBook.info);
// Виводимо в консоль налаштування властивости info
console.log(Object.getOwnPropertyDescriptor(scinceBook, "info"));


// 5. Поліморфізм: створення нового об'єкта та перевизначення його методу
/*
 * Об'єкт: Textbook
 * Властивості та функції наслідуються від об'єкта ScienceBook
 * Метод read() перевизначено для демонстрації поліморфізму,
 * має виводити "Ви читаєте підручник "<title>" від <author>. <info>"
 */
//Створюємо Textbook та наслідуємо властивості з ScienceBook
const textBook = Object.create(scinceBook);
// Перевизначаємо метод read(), відповідно з дописом вище
textBook.read = function() {
    return `"Ви читаєте підручник ${this.title} від ${this.author}. ${this.info}"`
}
// Встановлюємо значення для Textbook
// | Властивість | Значення                   |
// |-------------|----------------------------|
// | title       | "Фізика у Вищій Школі"     |
// | author      | "Дж. Д. Джонс"             |
textBook.title = "Фізика у Вищій Школі";
textBook.author = "Дж. Д. Джонс";

console.log("Завдання: 5 ==============================");
// Викликаємо функцію read об'єкту Textbook
console.log(textBook.read());


// 6. Абстракція: створення об'єкта з загальними властивостями
/*
 * Об'єкт: Media
 * Властивості:
 * --------------
 * | Властивість | Значення           |
 * |-------------|--------------------|
 * | format      | "Загальний Формат" |
 * | length      | 0                  |
 *
 * Функції:
 * ---------------------------------------------------------------------------------------------------------------
 * | Функція | Опис                                                                                              |
 * |---------|---------------------------------------------------------------------------------------------------|
 * | play()  | Виводить повідомлення "Зараз відтворюється медіа у форматі <format> з тривалістю <length> секунд" |
 */

// Створюємо об'єкт Media

/*
 * Об'єкт: Song
 * Властивості та функції наслідуються від об'єкта Media
 * Додаткові властивості: artist, title
 */

// Створюємо об'єкт Song, наслідуємо властивості і функції від об'єкта Media

// Встановлюємо додаткові властивості
// | Властивість | Значення               |
// |-------------|------------------------|
// | artist      | "Загальний Виконавець" |
// | title       | "Загальна Пісня"       |

console.log("Завдання: 6 ==============================");
// Викликаємо функцію play об'єкту Song




// Створення об'єкту, котрий далі стане прототипом для інших об'єктів
// Імена прототипів прийнято писати з великої літери
const Animal = {
    name: 'Тварина',
    voice: 'Звук',
    say() {
        console.log(`${this.name} каже ${this.voice} `)
    }
}
// створюємо новий об'єкт за допомогою реструктуризаціїї (spread), котрий буде мати властивості та методи від Animal
const dog = { ...Animal };
dog.name = 'Бобик';
dog.voice = 'гав';
dog.age = 5;
// dog.say();
// такий метод створення має недоліки у вигляді того що будь яка властивисть або метод Animal доданий пызныше не додасться до вщп
// Створення об'єкта за прототипом дозволяє додавати властивості та методи до бази і вони будуть додані до прототипу
const cat = Object.create(Animal);
cat.name = 'Мотя';
cat.voice = 'мяу';

// cat.say();
Animal.go = function () {
    console.log(`${this.name} стрибає`)
};
// cat.go();
// функція додана до прототипу Animal після створення об'єкту cat була автоматично додана до cat
// визначення прототипу об'єкту
// console.log(Object.getPrototypeOf(cat));
// перевірка чи є об'єкт прототипом іншого об'єкту
// console.log(Animal.isPrototypeOf(cat));

// зміна прототипу об'єкта (замість одного прототипу буде інший прототип)
// Object.setPrototypeOf(cat, null) // перший об'єкт той що міняє свій прототип, другий об'єкт котрий стане новим прототипом для першого (у разі якщо другим аргументом вказано null то новий об'єкт буде null)
// console.log(Object.getPrototypeOf(cat)); // але
// console.log(cat);

//Інкапсуляція (encapsulation) об'єднання властивостей об'єкту, їх налаштування та надання публічного доступу до них
Object.defineProperty(cat, "age", {
    // value: 10,
    set(value) {
        this._age = value * 2; // це створення приватної властивості
    },

    get() {
        return `${this._age || 0} років`;
    },
});
Object.defineProperty(cat, "location", {
    value: "Київ",
    enumerable: true, // врахує властивість у разі ітерації
    writable: true, //даж можливість перезаписувати значення 
    configurable: true, //властивість можна змінувати або видаляти
}) 
// console.log(cat.age);
// cat.age = 5;
// console.log(cat.age);
// // delete cat.age;
// console.log(cat.location);
//
// console.log(Object.keys(cat));
// console.log(Object.getOwnPropertyDescriptor(cat, "age"));

// Поліморфізм - принцип ООП який дозволяє різним об'єктам мати методи з одним ім'ям але різним функціоналом в методі
const Tag = {
    render(value) {
        return `<>${value}</>`
    },
};
// створили об'єкт Tag і далі взявши його за прототим робимо об'єкт Button
const Button = Object.create(Tag);
Button.render = function (value = "Press me") {
    return `<button style="${this.style}">${value}</button>`
};
// створили об'єкт Button і змінили йому метод render() використовуючи принцип поліморфізму, далі на основі об'єкту Button створюємо новий об'єкт mainButton і додаємо йому нову властивість
const mainButton = Object.create(Button, {
    style: {
        value: "background: orange:",
        writable: true,
    }
});
// дивимось що вийшло
// console.log(mainButton.render("Click"));

const Input = Object.create(Tag);
Input.render = function (value = "Press me") {
    return `<input placeholder="${this.placeholder}" style="${this.style}"/>`
};
const loginInput = Object.create(Input, {
    style: {
        value: "border: 1px solid tomato",
        writable: true,
    },
    placeholder: {
        value: "login ..."
    },
});
// console.log(loginInput.render());