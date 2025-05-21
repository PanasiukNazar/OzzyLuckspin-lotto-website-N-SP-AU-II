const QUESTIONS = [
    {
        label: 'How do you maximize your success in online gaming?',
        answers: [
            'I follow a structured gaming strategy for consistent rewards.',
            'I adjust my gameplay based on each session’s flow.',
            'I rely on instinct and luck rather than planning.',
            'I am still exploring different gaming techniques.',
        ],
    },
    {
        label: 'Which gaming techniques do you use to improve your play?',
        answers: [
            'Skill-based challenges – I focus on sharpening my reflexes.',
            'Strategy games – I analyze every move to optimize results.',
            'Both skill and strategy for a balanced approach.',
            'I play for fun and excitement rather than competition.',
        ],
    },
    {
        label: 'How do you handle risk in high-stakes entertainment?',
        answers: [
            'I set limits and stick to a solid gaming plan.',
            'I take calculated risks based on my gaming experience.',
            'I often go all-in and embrace the thrill of the game.',
            'I play casually and don’t worry about risk management.',
        ],
    },
    {
        label: 'How do you measure your success in interactive gaming?',
        answers: [
            'By achieving consistent payouts over time.',
            'By winning the most challenging skill-based games.',
            'By reaching new levels in progressive play.',
            'I play for entertainment and don’t track my success.',
        ],
    },
    {
        label: 'Do you have a structured gaming approach, and how strictly do you follow it?',
        answers: [
            'I have a solid plan and always stick to it.',
            'I have a plan but adapt to the gaming experience.',
            'I am still developing my approach to online gaming.',
            'I enjoy mobile play and go with the flow.',
        ],
    },
];

const $container = document.getElementById('container');

const startStep = {
    render: () => {
        $container.innerHTML = `
        <div class="container quiz-wrapper">
            <div class="row quiz-content">
                <div class="col-lg-6 col-md-6 col-lg-6">
                    <h2 class="title">Test Your Gaming Skills</h2>
                    <h3>Find out how well you navigate strategy games, progressive play, and high-stakes entertainment.</h3>
                    <button class="btn btn-primary py-3 first-button" data-action="startQuiz">Start</button>
                </div>
                <div class="col-lg-6 col-md-6 col-lg-6">
                    <img class="quiz-img" src="img/quiz.jpg">
                </div>
            </div>
        </div>
        `;
    },
    onClick: (el) => {
        if (el.getAttribute('data-action') === 'startQuiz') {
            quiz.nextStep(questionsStep);
        }
    },
};

const questionsStep = {
    questionIndex: 0,
    answers: {},
    render: () => {
        const question = QUESTIONS[questionsStep.questionIndex];

        $container.innerHTML = `
        <div class="container quiz-wrapper">
            <div class="row quiz-content text-center">
                <h3>${question.label}</h3>
                <div class="row answers">
                    ${question.answers
                        .map(
                            (answer, index) =>
                                `<button class="answer col-md-12 col-lg-6 border rounded" data-action="selectAnswer" data-answer-index="${index}">
                                    ${answer}
                                </button>`
                        )
                        .join('')}
                </div>
            </div>
        </div>
        `;
    },
    onClick: (el) => {
        switch (el.getAttribute('data-action')) {
            case 'selectAnswer':
                return questionsStep.selectAnswer(
                    parseInt(el.getAttribute('data-answer-index'), 10),
                );
        }
    },
    selectAnswer: (answerIndex) => {
        const question = QUESTIONS[questionsStep.questionIndex];
        const selectedAnswer = question.answers[answerIndex];

        questionsStep.answers = {
            ...questionsStep.answers,
            [question.label]: selectedAnswer,
        };

        if (questionsStep.isFinalQuestion()) {
            questionsStep.completeStep();
        } else {
            questionsStep.goToNextQuestion();
        }
    },
    isFinalQuestion: () => questionsStep.questionIndex === QUESTIONS.length - 1,
    goToNextQuestion: () => {
        questionsStep.questionIndex += 1;
        questionsStep.render();
    },
    completeStep: () => {
        quiz.setAnswers(questionsStep.answers);
        quiz.nextStep(finalStep);
    },
};

const finalStep = {
    render: () => {
        $container.innerHTML = `
        <div class="container quiz-wrapper">
            <div class="row quiz-content">
                <div class="col-lg-6 col-md-6 col-lg-6">
                    <img class="quiz-img" src="img/quiz-2.jpg">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <h2 class="title">Gaming Performance Review</h2>
                    <h3>Fill out the form to receive your personalized gaming strategy guide!</h3>
                    <form>
                        <input class="form-control" name="name" type="name" placeholder="Name" required>
                        <input class="form-control" name="email" id="email2" type="email" placeholder="Email" required>
                        <div id="validation" style="color: red"></div>
                        <input class="form-control" name="phone" type="number" id="phone" step="0.01" placeholder="Phone Number" required>
                        
                        <input name="pokies" value="Pokies" hidden>
                        <input name="onlineGames" value="Online Games" hidden>
                        <input name="gamingRewards" value="Gaming Rewards" hidden>
                        <input name="virtualExperience" value="Virtual Experience" hidden>
                        <input name="highStakesEntertainment" value="High-Stakes Entertainment" hidden>
                        
                        <button data-action="submitAnswers" class="btn btn-primary w-50 py-3">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        `;
    },
    onClick: (el) => {
        if (el.getAttribute('data-action') === 'submitAnswers') {
            const emailInput = document.getElementById('email2').value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailRegex.test(emailInput)) {
                document.getElementById('validation').textContent = '';
                window.location.href = 'thanks.html';
                localStorage.setItem('quizDone', true);
                document.getElementById('quiz-page').classList.add('hide');
            } else {
                document.getElementById('validation').textContent =
                    'Invalid email address. Please enter a valid email.';
            }
        }
    },
};

const quiz = {
    activeStep: startStep,
    answers: {},
    clear: () => ($container.innerHTML = ''),
    init: () => {
        $container.addEventListener('click', (event) =>
            quiz.activeStep.onClick(event.target),
        );
        $container.addEventListener('submit', (event) =>
            event.preventDefault(),
        );
    },
    render: () => {
        quiz.clear();
        quiz.activeStep.render();
    },
    nextStep: (step) => {
        quiz.activeStep = step;
        quiz.render();
    },
    setAnswers: (answers) => (quiz.answers = answers),
};

if (!localStorage.getItem('quizDone')) {
    quiz.init();
    quiz.render();
}
