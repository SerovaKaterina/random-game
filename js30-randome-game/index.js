
let timerDisplay = document.getElementById('timer');
let isTimerExpired = false;
let timerInterval;

function startTimer() {
    let durationInSeconds = 60;

    function updateTimer() {
        let minutes = Math.floor(durationInSeconds / 60);
        let seconds = durationInSeconds % 60;

        timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (--durationInSeconds < 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = 'Время вышло!';
            timerDisplay.style.fontFamily = "Caveat"
            timerDisplay.style.color = 'red';

            isTimerExpired = true;
            document.querySelector('.btn_praxis').disabled = true;
            document.getElementById('answer').disabled = true;
            showAnswer();
        }
    }
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

let currentAnswer;
function generateQuestion() {
    {
        let num1 = Math.floor(Math.random() * 9) + 1;
        let num2 = Math.floor(Math.random() * 9) + 1;
        return { num1, num2, answer: num1 * num2 };
    }
}

function displayQuestion() {
    if (isTimerExpired) return;
    let question = generateQuestion();
    document.getElementById('question').textContent = `${question.num1} x ${question.num2} =`;
    document.getElementById('answer').value = '';
    currentAnswer = question.answer;

    document.getElementById('resultIcon').textContent = '';
}



function checkAnswer() {
    let resultIcon = document.getElementById('resultIcon');
    let userAnswer = document.getElementById('answer').value.trim();

    if (userAnswer === "") {
        resultIcon.textContent = 'Введите ответ!';
        resultIcon.style.color = 'red';
        return;
    }

    userAnswer = parseInt(userAnswer);

    let scoreElementRight = document.getElementById('result_right');
    let scoreRight = parseInt(scoreElementRight.textContent);
    let scoreElementWrong = document.getElementById('result_wrong');
    let scoreWrong = parseInt(scoreElementWrong.textContent);

    if (userAnswer === currentAnswer) {
        scoreRight++;
        resultIcon.textContent = '✔️';
        resultIcon.style.color = 'green';
    } else {
        scoreWrong++;
        resultIcon.textContent = '❌';
        resultIcon.style.color = 'red';
    }

    scoreElementRight.textContent = scoreRight;
    scoreElementWrong.textContent = scoreWrong;

    setTimeout(displayQuestion, 500);

}

function showAnswer() {
    let text_message = document.getElementById("text_result");
    let scoreAll = parseInt(document.getElementById('result_right').textContent) + parseInt(document.getElementById('result_wrong').textContent);
    let scoreRight = parseInt(document.getElementById('result_right').textContent);
    text_message.textContent = `Ваш результат ${scoreRight} из ${scoreAll}`;
    text_message.style.color = 'red';
}

function startGame() {
    startTimer();
    displayQuestion();
}

document.getElementById('answer').addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        checkAnswer();
    }
});

document.querySelector('.btn_timer').addEventListener("click", startGame);