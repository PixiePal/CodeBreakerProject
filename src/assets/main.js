let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
	let input = document.getElementById('user-guess');

	if ((answer.value == '') || (attempt.value == '')) {
		setHiddenFields();
	}

	let userGuess = document.getElementById('user-guess').value;
	if (!validateInput(userGuess)) {
		return false;
	}

	attempt.value = Number(attempt.value) + 1;
	setMessage("");

	if (getResults(userGuess)) {
		setMessage("You Win! :)");
		showAnswer(true);
		showReplay();
	} else if (attempt.value >= 10) {
		setMessage("You Lose! :(");
		showAnswer(false);
		showReplay();
	} else {
		setMessage("Incorrect, try again.");
	}
};


function setHiddenFields() {
	let answerString = (Math.floor(Math.random() * 10000)).toString();
	while (answerString.length < 4) {
		answerString = "0" + answerString;
	}
	answer.value = answerString;

	attempt.value = 0;
}

function setMessage(newMessage) {
	document.getElementById('message').innerHTML = newMessage;
}

function validateInput(code) {
	if (code.length == 4) {
		return true;
	}
	setMessage("Guesses must be exactly 4 characters long.");
	return false;
}

function getResults(usersGuess) {
	let resultHTML = '<div class="row"><span class="col-md-6">' + usersGuess + '</span><div class="col-md-6">';

	let usersGuessString = usersGuess.toString();
	let correctCount = 0;

	for (let i = 0; i < usersGuessString.length; i++) {
		let guessChar = usersGuessString.charAt(i);
		let answerChar = answer.value.charAt(i);

		if (guessChar == answerChar) {
			// this digit was guessed correctly
			resultHTML += '<span class="glyphicon glyphicon-ok">';
			correctCount++;
			continue;
		}

		if (answer.value.indexOf(guessChar) < 0) {
			// this digit is not at all in the answer
			resultHTML += '<span class="glyphicon glyphicon-remove"></span>';
			continue;
		}

		// this digit it's there in the answer, but not on this position 
		resultHTML += '<span class="glyphicon glyphicon-transfer"></span>';
	}

	resultHTML += '</div></div>'
	document.getElementById('results').innerHTML += resultHTML;

	return (usersGuessString.length == correctCount);

}

function showAnswer(isWinning) {
	let codeElement = document.getElementById('code');

	codeElement.innerHTML = answer.value;
	codeElement.setAttribute('class', codeElement.getAttribute('class') + (isWinning ? " success" : " failure"));
}

function showReplay() {
	document.getElementById('guessing-div').setAttribute('style', 'display: none');
	document.getElementById('replay-div').setAttribute('style', 'display: block');
}