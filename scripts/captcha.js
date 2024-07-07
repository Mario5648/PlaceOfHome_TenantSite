document.addEventListener('DOMContentLoaded', function() {
    function generateRandomNumber() {
        return Math.floor(Math.random() * 10) + 1;
    }

    let num1 = generateRandomNumber();
    let num2 = generateRandomNumber();

    document.getElementById('num1').innerText = num1;
    document.getElementById('num2').innerText = num2;

    document.getElementById('captcha').addEventListener('submit', function(event) {
        event.preventDefault();

        let userAnswer = parseInt(document.getElementById('captchaInput').value, 10);
        let correctAnswer = num1 + num2;

        if (userAnswer === correctAnswer) {
            document.getElementById('resultMessage').innerText = 'CAPTCHA solved successfully!';
            document.getElementById('resultMessage').classList.add('success');
            document.getElementById('resultMessage').classList.remove('error');
        } else {
            document.getElementById('resultMessage').innerText = 'Incorrect answer. Please try again.';
            document.getElementById('resultMessage').classList.add('error');
            document.getElementById('resultMessage').classList.remove('success');
        }

        // Generate new CAPTCHA
        num1 = generateRandomNumber();
        num2 = generateRandomNumber();
        document.getElementById('num1').innerText = num1;
        document.getElementById('num2').innerText = num2;
        document.getElementById('captchaInput').value = '';
    });
});
