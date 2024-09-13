  document.addEventListener('DOMContentLoaded', () => {
            const hoursInput = document.getElementById('hours');
            const minutesInput = document.getElementById('minutes');
            const secondsInput = document.getElementById('seconds');
            const startButton = document.getElementById('startButton');
            const stopButton = document.getElementById('stopButton');
            const timerDisplay = document.getElementById('timerDisplay');
            let intervalId;

            function updateDisplay(hours, minutes, seconds) {
                timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            }

            function speakMessage(message) {
                const utterance = new SpeechSynthesisUtterance(message);
                window.speechSynthesis.speak(utterance);
            }

            function startTimer() {
                let hours = parseInt(hoursInput.value) || 0;
                let minutes = parseInt(minutesInput.value) || 0;
                let seconds = parseInt(secondsInput.value) || 0;
                let totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
                if (totalSeconds <= 0) return;
                clearInterval(intervalId);
                intervalId = setInterval(() => {
                    if (totalSeconds <= 0) {
                        clearInterval(intervalId);
                        updateDisplay(0, 0, 0);
                        speakMessage('Tempo esgotado!');
                        return;
                    }
                    totalSeconds--;
                    hours = Math.floor(totalSeconds / 3600);
                    minutes = Math.floor((totalSeconds % 3600) / 60);
                    seconds = totalSeconds % 60;
                    updateDisplay(hours, minutes, seconds);
                }, 1000);
            }

            function stopTimer() {
                clearInterval(intervalId);
            }

            startButton.addEventListener('click', startTimer);
            stopButton.addEventListener('click', stopTimer);
        });
