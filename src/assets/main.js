let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(answer.value === '' && attempt.value === ''){
        setHiddenFields();
    }
    if(!validateInput(input.value)){
        return false;
    } else {
        attempt.value++;
    }
    let result = getResults(input.value);
    if(result) {
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    } else if(!result && attempt.value >= 10) {
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
    } else {
        setMessage("Incorrect, try again.");
    }
}

//implement new functions here
function setHiddenFields() {
    answer.value = Math.floor(Math.random() * 9999).toString();
    while(answer.value.length < 4){
        answer.value = '0' + answer.value;
    }
    attempt.value = 0;
}
function setMessage(message){
    document.getElementById('message').innerHTML = message;
}
function validateInput(input){
    if (input.length === 4) return true;
    setMessage("Guesses must be exactly 4 characters long.");
    return false;
}
function getResults(input){
    let correctAnswer = 0;
    let results = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
    for (let i = 0; i < input.length; i++) {
        if(answer.value[i] === input[i]) {
            correctAnswer++;
            results += '<span class="glyphicon glyphicon-ok"></span>';
        } else if(answer.value.indexOf(input[i]) !== -1) {
            results += '<span class="glyphicon glyphicon-transfer"></span>';
        } else {
            results += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    results += '</div></div>';
    document.getElementById('results').innerHTML += results;
    if (correctAnswer === 4) return true;
    else return false;

}
function showAnswer(result){
    document.getElementById('code').innerHTML = answer.value;
    if(result) document.getElementById('code').setAttribute('class', ' success');
    else document.getElementById('code').setAttribute('class', ' failure');
}
function showReplay(){
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
}