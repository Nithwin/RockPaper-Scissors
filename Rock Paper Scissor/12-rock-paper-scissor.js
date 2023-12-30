let score = JSON.parse(localStorage.
getItem('score')) || {
        win:0,
        loose:0,
        tie:0
};
updatescore();
function updatescore(){
    document.querySelector('.js-score').
innerHTML=`Win:${score.win} Loss:${score.loose} tie:${score.tie}`;
}


function pick(){
    let computer;
    const r = Math.random();
    if(r >=0 && r < 1/3){
        computer = 'rock';
    }
    else if(r >= 1/3 && r<2/3){
        computer = 'paper';
    }
    else if(r >=2/3 && r<1) {
        computer = 'scissor';
    }
    return computer
}

function player(option){
    let computer = pick();
    if (option==='rock')   {
        win='scissor';
        loose='paper';
    }
    else if (option==='paper')   {
        win='rock';
        loose='scissor';
    }
    else if (option==='scissor')   {
        win='paper';
        loose='rock';
    }

    if(computer===option){
        result='You tie';
        score.tie+=1;
    }
    else if(computer===loose){
        result='You loose';
        score.loose+=1;
    }
    else if(computer===win){
        result='You win';
        score.win+=1;
    }

    localStorage.setItem('score',JSON.stringify(score));

    updatescore();
    function convert(com){
        if(com==='rock'){
            com='imagess/rock-emoji.png';
        }
        else if(com==='paper'){
            com='imagess/paper-emoji.png';
        }
        else if(com==='scissor'){
            com='imagess/scissors-emoji.png';
        }
        return com;
    }
    document.querySelector('.js-move').
    innerHTML = result;
    document.querySelector('.js-result').
    innerHTML = `
    You
    <img src=${convert(option)} class="move-icon">
    <img src=${convert(computer)} class="move-icon">
    Computer
    `;


}
let isauto=false;
let intervalid;

function autoplay(){
    if(!isauto){
        document.querySelector('.auto-score-btn').innerHTML='Stop';
        intervalid = setInterval(function(){
            const playermov =pick();
            player(playermov)
        },1000);
        isauto=true;
    }
    else{
        document.querySelector('.auto-score-btn').innerHTML='Auto Play';
        clearInterval(intervalid);
        isauto=false;
    }
}

document.body.addEventListener('keydown',(i)=>{
    if(i.key ==='r'){
        player('rock');
    }
    else if(i.key ==='p'){
        player('paper');
    }
    else if(i.key === 's'){
        player('scissor');
    }
});
