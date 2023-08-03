const inputText = document.getElementById('inputText');
const speakButton = document.getElementById('speakButton');
const stopButton = document.getElementById('stopButton');

let utterance;
let lines;
let currentLineIndex = 0;

function highlightLine(lineIndex) {
  const linesArray = inputText.value.split('\n');
  linesArray.forEach((line, index) => {
    if (index === lineIndex) {
      linesArray[index] = `*${line}*`; // You can adjust the highlighting style as needed
    }
  });
  inputText.value = linesArray.join('\n');
}

function removeHighlight() {
  const linesArray = inputText.value.split('\n');
  linesArray.forEach((line, index) => {
    linesArray[index] = line.replace(/\*|\*/g, ''); // Remove asterisks used for highlighting
  });
  inputText.value = linesArray.join('\n');
}

function speakText() {
  if (typeof speechSynthesis === 'undefined') {
    alert('Sorry, your browser does not support text-to-speech.');
    return;
  }

  if (speechSynthesis.paused && utterance) {
    speechSynthesis.resume();
  } else {
    if (!utterance) {
      utterance = new SpeechSynthesisUtterance(inputText.value);
      utterance.lang = 'en-US';
      lines = inputText.value.split('\n');
      currentLineIndex = 0;
      utterance.onboundary = function (event) {
        if (event.name === 'sentence') {
          removeHighlight();
          highlightLine(currentLineIndex);
          inputText.setSelectionRange(inputText.value.indexOf('*'), inputText.value.lastIndexOf('*') + 1); // Select the current line
          inputText.scrollTop = inputText.scrollHeight * (currentLineIndex / lines.length);
          currentLineIndex++;
        }
      };
      utterance.onend = function () {
        removeHighlight();
        utterance = undefined;
      };
    }
    speechSynthesis.speak(utterance);
  }
}

function stopSpeaking() {
  if (utterance) {
    speechSynthesis.cancel();
    utterance = undefined;
    removeHighlight();
  }
}

speakButton.addEventListener('click', speakText);
stopButton.addEventListener('click', stopSpeaking);

// ... (previous JavaScript code) ...

const nightModeButton = document.getElementById('nightModeButton');
nightModeButton.addEventListener('click', toggleNightMode);

function toggleNightMode() {
  const container = document.querySelector('.container');
  const textArea = document.getElementById('inputText');
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');

  container.classList.toggle('night-mode');
  textArea.classList.toggle('night-mode');
  header.classList.toggle('night-mode');
  footer.classList.toggle('night-mode');
}

// ... (rest of the JavaScript code) ...
