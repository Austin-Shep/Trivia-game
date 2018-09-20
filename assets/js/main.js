let topic = document.querySelectorAll('.topic');
let timer = document.getElementById('timer');
let question = document.getElementsByClassName('question');
let score = document.getElementById('score');
let gameRunning = false;
let gameInit = false;
let questionWrit = false;
let answerWrit = false;
var answerChose = false;
let target;
let points = 0; 
let intervalId;
let number = 21;
let j = 0;
let conatiner;
let cR;

//functions=======================================// 
//writes the score
function writeScore(){ score.innerHTML = points}
//fresh slate
function initialize(){
    gameRunning = false;
    gameInit = true;
    points = '0';
    writeScore();    
};
function resetBooleans(){
    gameRunning = false;
    questionWrit = false;
    answerWrit = false;
    answerChose = false;
}

//listens for start game, will only run once


//for when the incorect answer is selected
function incramentJ(){
    j++;
}

//timer run
function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
};
//interludes
function interludes(){
    clearInterval(intervalId);
    intervalId = setInterval(interDecrement, 1000);
}
//timer for the interlude
function interDecrement(){
    number--;
    timer.innerHTML = 'Okay, next one in: ' + number + ' secs';
    if(number===0){

        stop();
        resetBooleans();
        writeQuestion();
        number = 21;
        run();
    }
}

//timer countdown
function decrement() {
    number--;
    timer.innerHTML = number + ' seconds left!';
    if(number===0){
        stop();
        timout();
    }
}
//timer stop
function stop(){
    clearInterval(intervalId);
}
//writes the question, answers and such, based on 'j'
function writeQuestion(){
    //function wont run if the question is 'Writ'
    if(!questionWrit){
        var queue = document.querySelector('#answerQueue'); 
        queue.innerHTML = '';                       
        var jq = document.createElement('h2');
        jq.setAttribute('id', 'question');
        jq.textContent = questionList[j]['write'];
        queue.appendChild(jq);

            if(!answerWrit){
                for(var l = 0; l < questionList[j].answers.length; l++){
                    console.log(questionList[j].answers[l]);
                    var la = questionList[j].answers[l];
                    var aw = document.createElement('span');
                    var br = document.createElement('br')
                    aw.setAttribute('class', 'answer');
                    aw.setAttribute('data-value', la['isCorrect']);
                    aw.innerHTML = la['content'];
                    queue.appendChild(aw);
                    queue.appendChild(br);
                    answerWrit = true;
                    conatiner = document.querySelector('#answerQueue');
                    cR = conatiner.querySelector("span[data-value=true]");
                };
            };
        return questionWrit = true;                  
    };
}
function trueText(){
    topic.innerHTML = "*ding!ding!ding!* correct!";
};
function falseText(){
    topic.innerHTML = '*err!* you\'re wrong';
};
function timeText(){
    topic.innerHTML = '*errrr!* outatime';
};
function guessTrue(){
    trueText();
    target.className += ' highlight';
    points++;
    incramentJ();
    stop();
    number = 7;
    interludes();
    return answerChose = true;
};

function guessFalse(){
    falseText();
    target.className += ' wronglight';
    cR.className += ' highlight';
    incramentJ();
    stop();
    number = 7;
    interludes();
    return answerChose = true;

};

function timout(){
    timeText();
    cR.className += ' highlight';
    incramentJ();
    stop();
    number = 7;
    interludes();
    return answerChose = true;
};

/////=========================End functions==============================////

/////=========================Event Listeners============================////
document.addEventListener('keyup', function(){
    if(gameRunning) return false;

    if(!gameInit) initialize();
    
    if(gameInit) {
        gameRunning = true;
    }
    
    if(gameRunning){
        writeQuestion();
        run()
    }

});

document.addEventListener('click', function(event){
    target = event.target.closest('span');
    if(answerChose) return false;
    if(target.className != 'answer') return false;
    
    console.log('conatiner = ' + conatiner);
    console.log(cR);
        
        x = target.getAttribute('data-value')
        console.log(target);
        console.log(x);

        if(x == 'false') guessFalse();
        else if(x == 'true') guessTrue();
});

////=================End Event Listeners=======================///


