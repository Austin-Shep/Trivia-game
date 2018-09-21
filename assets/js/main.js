let topic = document.getElementById('topic');
let timer = document.getElementById('timer');
let question = document.getElementsByClassName('question');
let score = document.querySelector('div.score');
var queue = document.querySelector('#answerQueue'); 
let gameRunning = false;
let gameInit = false;
let questionWrit = false;
let answerWrit = false;
var answerChose = false;
let target;
let points = '0'; 
let intervalId;
let number = 21;
let j = 0;
let conatiner;
let cR;
let g;
let s;

let gameOver1 = false

//functions=======================================// 
//writes the score
function clearClass(param){
    param.removeAttribute('class');
}

function writeScore(){
    score.setAttribute('class', 'animated rotateIn');
    score.innerHTML = "score: " + points;
    }
//fresh slate
function initialize(){
    gameRunning = false;
    gameInit = true;
    points = '0';
    writeScore(); 
    j= 0;   
};
function resetBooleans(){
    gameRunning = false;
    questionWrit = false;
    answerWrit = false;
    answerChose = false;
    
}
function restart(){
    resetBooleans();
    gameOver1 = false;
    gameInit = false;
    queue.innerHTML = '';
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
//game over 
function gameOver(){
    queue.innerHTML = '';
    let d = document.createElement('div');
    g = document.createElement('H1');
    s = document.createElement('H2');

    g.setAttribute('class', 'animated bounceInDown');
    if(points >= 3){
        g.innerHTML= "You may cross";
    }else{
        g.innerHTML= "*AAHHHHHHhhh!!......*"
    }
    
    s.setAttribute('class', 'bounceIn');
    s.innerHTML = 'Final Score: ' + points;

    let tA = document.createElement('button');
    tA.textContent= 'play again?';
    tA.setAttribute('class', 'animated bounce');
    tA.setAttribute('onClick', 'javascript:restart();')
    
    g.appendChild(s);
    d.appendChild(g);
    d.appendChild(tA);
    queue.appendChild(d);
    return gameOver1 = true;
}

//timer for the interlude
function interDecrement(){
    if(!gameOver1){
        number--;
        timer.innerHTML = 'Okay, next one in: ' + number + ' secs';
        if(number < 4) queue.setAttribute('class', 'fadeOut');
        if(number===0){
            topic.innerHTML = '';
            queue.removeAttribute('class', 'fadeOut')
            stop();
            clearClass(score);
            resetBooleans();
            j++;
            writeQuestion();
            number = 21;
            return run();
        }
    }
}

//timer countdown
function decrement() {
    if(!gameOver1){
    number--;
    timer.innerHTML = number + ' seconds left!';
        if(number===0){
            stop();
            timout();
        }
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
        if(j+1 > questionList.length){
            gameOver();
        }
        else if (!gameOver1){
        queue.innerHTML = '';                       
        var jq = document.createElement('h2');
        jq.setAttribute('id', 'question');
        jq.setAttribute('class', 'animated bounceInRight')
        jq.textContent = questionList[j]['write'];
        queue.appendChild(jq);

            if(!answerWrit){
                for(var l = 0; l < questionList[j].answers.length; l++){
                    console.log(questionList[j].answers[l]);
                    var la = questionList[j].answers[l];
                    var aw = document.createElement('span');
                    var br = document.createElement('br');
                    aw.setAttribute('class', 'answer animated bounceInLeft')
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
};
};

function resultText(param){
    let re = document.createElement('p');
    re.setAttribute('class', 'animated jackInTheBox');
    if(param){
        re.innerHTML= "Good Job!"
    }
    if(!param){
        re.innerHTML = "Beter Luck Next Time!"
    }
    if(param === 'time'){
        re.innerHTML = "Gotta Be Quicker Than That!"
    }
    return topic.appendChild(re)
}


function guessTrue(){
    resultText(true)
    target.className += ' highlight';
    points++;
    stop();
    number = 7;
    interludes();
    writeScore();
    return answerChose = true;
};

function guessFalse(){
    resultText(false)
    target.className += ' wronglight';
    cR.className += ' highlight';
    stop();
    number = 7;
    interludes();
    return answerChose = true;

};

function timout(){
    resultText('time')
    cR.className += ' highlight';
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
    if(!target.className.includes('answer')) return false;
    
    console.log('conatiner = ' + conatiner);
    console.log(cR);
        
        x = target.getAttribute('data-value')
        console.log(target);
        console.log(x);

        if(x == 'false') guessFalse();
        else if(x == 'true') guessTrue();
});

////=================End Event Listeners=======================///


