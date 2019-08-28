"use strict";

import quiz from "./quiz-data.js";

function createHtnml(quizArr) {
  const { title, questions } = quizArr; // деструктуризация объекта
  const mainDoc = questions
    .map((quest, i) => {
      const html = `<section>
<h3>${quest.question}</h3>
<ol>
  ${partTwo(quest.choices, i)} 
</ol>
</section>
`; // создание разметки в хтмл (при этом квест как строчка,а И как итератор , который запускает функцию отпределенное количество раз. Парк ту - фунция , которую мы вызываем выполняет создание разметки вариантов ответов , при этом эта ф-я так же имеет строчки, которые будут записаны с помощью итератора. )
      return html;
    })
    .join(""); // это обьедение всех элементов массива в строку
  const mainTitle = `<h1>${title}</h1>`; // создание разметки тайтла

  return mainTitle + mainDoc; // возвращаем результат ф-и , конкатенация элементов
}

function partTwo(abc, i) {
  const choicesPart = abc
    .map((choice, iTwo) => {
      const htmlTwo = `
    <li>
      <label>
        <input type="radio" required name="choises${i}" value="${iTwo}" />
        ${choice}
      </label>
    </li>`; // создание разметки выриантов ответов , где чоиз - строка , иту - сколько раз должна выполниться ф-я, и- для того чтобы варианты ответов были активны в одном вопросе
      return htmlTwo; // возврат строки
    })
    .join(""); // это обьедение всех элементов массива в строку --- зачем? обязательно ли?надо
  return choicesPart; // а вот это возврат ф-и
}

const menu = document.querySelector(".js-form"); // выбор обьекта куда мы собираемся вставлять
menu.insertAdjacentHTML("afterbegin", createHtnml(quiz)); // куда и что мы будем вставлять

// ===================

const form = document.querySelector(".js-form"); // выбираем форму

form.addEventListener("submit", handleSubmit); //

function handleSubmit(event) {
  event.preventDefault();
  let total = 0;
  let userAnswer = [];

  const checkedData = new FormData(event.currentTarget);

  checkedData.forEach(value => {
    userAnswer.push(Number(value));
  });

  const correctAnswer = quiz.questions.map(ans => ans.answer);
  for (let j = 0; j < userAnswer.length; j++) {
    if (userAnswer[j] === correctAnswer[j]) {
      total += 1;
    }
  }

  const result = Math.round((total / correctAnswer.length) * 100);
  

  let message;
  if (result >= 80) {
    message = `Молодец! Ты набрал ${result} %`;
  } else {
    message = `Учи еще! Ты набрал ${result} %`;
  }

  const mesHtml = `<p>${message}</p>`;

  const but = document.querySelector(".mainBut"); // выбор обьекта куда мы собираемся вставлять
  but.insertAdjacentHTML("afterend", mesHtml); // куда и что мы будем вставлять

  but.setAttribute('disabled', 'disabled');

}
