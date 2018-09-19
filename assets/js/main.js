let topic = document.getElementsByClassName('topic');
let timer = document.getElementById('timer');
let question = document.getElementsByClassName('question');
let choice = document.getElementsByClassName('choice');
let ans = document.getElementsByClassName('ans');
let ansA = document.getElementById('ansA');
let ansB = document.getElementById('ansB');
let ansC = document.getElementById('ansC');
let ansD = document.getElementById('ansD');
let score = document.getElementById('score');
let gameRunning = false;
let gameInit = false;
let questionWrit = false;
let answerWrit = false;
var answerChose = false;
let points = 0; 
let intervalId;
let number = 25;
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
    ans.textContent = ' ';
    points = '0';
    writeScore();    
};
//listens for start game, will only run once


//for when the incorect answer is selected

function timeout(){
    j++;
}

//timer run
function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
};
//timer countdown
function decrement() {
    number--;
    timer.innerHTML = number;
    if(number===0){
        stop();
        timeout();
    }
}
//timer stop
function stop(){
    clearInterval(intervalId);
}
//writes the question, answers and such, based on 'j'
function writeQuestion(){
    if(!questionWrit){
        // for(j = 0; j < questionList.length; j++){
            var queue = document.querySelector('#answerQueue');                        
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
        // };                   
    };
}

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
    let target = event.target.closest('span');
    if(answerChose) return false;
    if(target.className != 'answer') return false;
    
    console.log('conatiner = ' +conatiner)
    console.log(cR);
        
        x = target.getAttribute('data-value')
        y = 
        console.log(target);
        console.log(x);

        if(x == 'false' && !answerChose){
            console.log('*err!* you\'re wrong');
            target.className += ' wronglight';
            cR.className += ' highlight';
            stop();
            run()
            return answerChose = true;
            
        }else if(x == 'true'){
            console.log('*ding!ding!ding!* correct!')
            target.className += ' highlight';
            points++;
            stop();
            run();
           return answerChose = true;

        }
});

function guessTrue(){
    console.log('*ding!ding!ding!* correct!')
    target.className += ' highlight';
    points++;
    stop();
    run();
   return answerChose = true;
};

function guessFalse(){
    console.log('*err!* you\'re wrong');
    target.className += ' wronglight';
    cR.className += ' highlight';
    stop();
    run()
    return answerChose = true;

};




