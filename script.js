document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            id: 1,
            question: "You’ve been tasked with improving the loading speed of a web page. Which technique could you use to achieve this?",
            options: [
                "A) Increasing the image sizes to enhance visual quality.",
                "B) Minifying and compressing CSS and JavaScript files.",
                "C) Adding complex animations to engage users.",
                "D) Including multiple large video files."
            ],
            answer: "B) Minifying and compressing CSS and JavaScript files.",
            explanation: "1) Minifying and compressing CSS and JavaScript files reduce their file sizes by removing unnecessary whitespace and comments. This improves the page’s loading speed, as smaller files can be transmitted and processed more quickly by browsers."
        },
        {
            id: 2,
            question: "What does the term “Responsive Web Design” refer to?",
            options: [
                "A) Designing websites with large images and flashy animations.",
                "B) Creating web applications that can only be accessed on mobile devices.",
                "C) Designing websites that adapt and display properly on various screen sizes and devices.",
                "D) Designing websites using only HTML without any CSS."
            ],
            answer: "C) Designing websites that adapt and display properly on various screen sizes and devices.",
            explanation: "2) Responsive web design involves creating websites that automatically adjust their layout and content to provide an optimal user experience across a wide range of devices, from desktops to smartphones and tablets."
        },
        {
            id: 3,
            question: "You’ve identified a bug in the software. The bug occurs only when the application is used by a large number of users simultaneously. What type of testing is most appropriate to address this issue?",
            options: [
                "A) Unit Testing",
                "B) Functional Testing",
                "C) Regression Testing",
                "D) Load Testing"
            ],
            answer: "D) Load Testing",
            explanation: "3) Load testing is used to assess how well an application performs under expected load conditions. It helps identify bottlenecks and performance issues when the system is subjected to a high volume of users or data."
        },
        {
            id: 4,
            question: "In software testing, what does the term “Black Box Testing” refer to?",
            options: [
                "A) Testing the internal logic and code of a software component.",
                "B) Testing the security vulnerabilities of a software application.",
                "C) Testing the user interface and user interactions without knowledge of the internal code.",
                "D) Testing the compatibility of software with different operating systems."
            ],
            answer: "C) Testing the user interface and user interactions without knowledge of the internal code.",
            explanation: "4) Black Box Testing involves testing a software application’s functionality, inputs, and outputs without considering its internal logic. Testers focus on the application’s external behavior and how it responds to various inputs."
        },
        {
            id: 5,
            question: "What is the purpose of “Regression Testing” in the software development process?",
            options: [
                "A) To test newly added features and functionalities.",
                "B) To ensure the software is compatible with various operating systems.",
                "C) To validate that a code change has not negatively impacted existing functionality.",
                "D) To identify security vulnerabilities in the software."
            ],
            answer: "C) To validate that a code change has not negatively impacted existing functionality.",
            explanation: "5) Regression Testing involves testing an application after making code changes to ensure that existing functionalities have not been adversely affected. It helps catch unintended side effects of code modifications."
        },
        {
            id: 6,
            question: "Which of the following is a benefit of using automated testing?",
            options: [
                "A) It eliminates the need for human testers.",
                "B) It ensures tests are run consistently and accurately.",
                "C) It reduces the need for thorough test planning.",
                "D) It makes debugging easier by providing real-time feedback."
            ],
            answer: "B) It ensures tests are run consistently and accurately.",
            explanation: "6) Automated testing ensures that tests are executed in a consistent and repeatable manner, which helps in identifying regressions and maintaining software quality over time. It does not eliminate the need for human testers but complements their efforts."
        },
        {
            id: 7,
            question: "What does the term “Refactoring” refer to in software development?",
            options: [
                "A) Adding new features to the software.",
                "B) Rewriting the entire codebase from scratch.",
                "C) Restructuring existing code without changing its external behavior.",
                "D) Performing system testing to ensure quality."
            ],
            answer: "C) Restructuring existing code without changing its external behavior.",
            explanation: "7) Refactoring involves improving the internal structure of existing code without altering its external functionality. This process helps in making the code more readable, maintainable, and efficient."
        },
        {
            id: 8,
            question: "In agile development, what is a “User Story”?",
            options: [
                "A) A detailed technical specification.",
                "B) A description of a feature from the end-user's perspective.",
                "C) A list of tasks to be completed in a sprint.",
                "D) A use case diagram."
            ],
            answer: "B) A description of a feature from the end-user's perspective.",
            explanation: "8) A User Story in agile development is a simple description of a feature told from the perspective of the user or customer. It helps the development team understand the value of the feature and the needs of the end user."
        },
        {
            id: 9,
            question: "Which of the following best describes Continuous Integration (CI)?",
            options: [
                "A) Integrating software changes every few months.",
                "B) Automatically testing and merging code changes frequently.",
                "C) Releasing software updates annually.",
                "D) Performing manual code reviews before integration."
            ],
            answer: "B) Automatically testing and merging code changes frequently.",
            explanation: "9) Continuous Integration (CI) is a practice where developers frequently integrate their code changes into a shared repository, followed by automated builds and tests. This helps in early detection of issues and improves software quality."
        },
    ];

    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let startTime;
    let timerInterval;

    function startQuiz() {
        console.log('Quiz started');
        startTime = Date.now();
        showQuestion();
        startTimer();
        document.getElementById('submit').classList.remove('hidden');
    }

    function showQuestion() {
        const question = questions[currentQuestionIndex];
        const quizElement = document.getElementById('quiz');
        quizElement.innerHTML = `
            <div class="question">
                <p>${question.question}</p>
                <div class="options">
                    ${question.options.map((option, index) => `
                        <label>
                            <input type="radio" name="option" value="${option}">
                            ${option}
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
        console.log('Question displayed:', question.question);
    }

    function startTimer() {
        const timerElement = document.getElementById('timer');
        let time = 0;
        timerInterval = setInterval(() => {
            time++;
            const minutes = Math.floor(time / 60).toString().padStart(2, '0');
            const seconds = (time % 60).toString().padStart(2, '0');
            timerElement.textContent = `${minutes}:${seconds}`;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function submitAnswers() {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (!selectedOption) {
            alert('Please select an option.');
            return;
        }

        const selectedAnswer = selectedOption.value;
        const question = questions[currentQuestionIndex];

        const selectedAnswers = JSON.parse(localStorage.getItem('selectedAnswers')) || [];
        selectedAnswers.push({
            question: question.question,
            selectedAnswer: selectedAnswer,
            correctAnswer: question.answer,
            explanation: question.explanation
        });
        localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers));

        if (selectedAnswer === question.answer) {
            correctAnswers++;
        } else {
            wrongAnswers++;
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            displayResults();
        }
    }

    function displayResults() {
        stopTimer();
        console.log('Displaying results');
        
        // Hide the quiz and submit button
        document.getElementById('quiz').style.display = 'none';
        document.getElementById('submit').style.display = 'none';
    
        const resultsElement = document.getElementById('results');
        const selectedAnswers = JSON.parse(localStorage.getItem('selectedAnswers')) || [];
        console.log('Selected answers:', selectedAnswers); 
        resultsElement.innerHTML = `
            <h2>Quiz Results</h2>
            <p>Total Correct Answers: ${correctAnswers}</p>
            <p>Total Wrong Answers: ${wrongAnswers}</p>
            <h3>Explanations</h3>
            ${selectedAnswers.map((q, index) => `
                <div>
                    <p><strong>Q${index + 1}:</strong> ${q.question}</p>
                    <p><strong>Your Answer:</strong> ${q.selectedAnswer}</p>
                    <p><strong>Correct Answer:</strong> ${q.correctAnswer}</p>
                    <p><strong>Explanation:</strong> ${q.explanation}</p>
                </div>
            `).join('')}
        `;
        resultsElement.classList.remove('hidden');
        resultsElement.classList.add('show'); 
        console.log('Results displayed:', resultsElement.innerHTML); 
    
        localStorage.removeItem('selectedAnswers');
    }
    
    

    document.getElementById('submit').addEventListener('click', submitAnswers);

   
    startQuiz();
});
