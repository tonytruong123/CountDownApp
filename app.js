const fireworkContainer = document.querySelector('.fireworks-container')
let dd = document.querySelector('#day');
let hh = document.querySelector('#hour');
let mm = document.querySelector('#minute');
let ss = document.querySelector('#second');

let input = document.querySelector('input');

let startButton = document.querySelector('#start');
let resetButton = document.querySelector('#reset');

let countDown;

let timeCount = function(val){

    // get the time from the user input
    let timeEvent = new Date(val).getTime();
    // get the current time
    let currentTime = Date.now();

    // the total amount of time calculating from currentTime to the timeEvent in unit second
    let totalTime = (timeEvent - currentTime) / 1000;

    // we define the constant
    let dayConstant = 86400;
    let hrConst = 3600;
    let minConst = 60;

    // distribute total seconds from the time range to days, hours, and minutes & seconds
    // we find the amt of day by taking the total amount of second in the time range divided by the amount of second in a day
    let days = Math.floor(totalTime / dayConstant);
    totalTime = totalTime%dayConstant;

    let hours = Math.floor(totalTime / hrConst);
    totalTime = totalTime%hrConst;

    let minutes = Math.floor(totalTime / minConst);
    totalTime = totalTime%minConst;
    
    let seconds = Math.floor(totalTime);

    if (days < 10){
        days = '0' + days;
    }

    if (hours < 10){
        hours = '0' + hours;
    }

    if (minutes < 10){
        minutes = '0' + minutes;
    }

    if (seconds < 10){
        seconds = '0' + seconds;
    }

    if(totalTime < 0){
        clearInterval(countDown);
    }

    // most important part: display the values
    dd.innerHTML = days;
    hh.innerHTML = hours;
    mm.innerHTML = minutes;
    ss.innerHTML = seconds;

}

startButton.onclick = () => {

    // the value we take from the input
    let val = input.value;

    console.log(val);

    if (val !==''){
        // setInterval allow us to run the function timeCount repeatedly in the time range 1s per time with the time range 
        // taken from the user when they choose the day
        countDown = setInterval(timeCount, 1000, val);
        resetButton.removeAttribute('disabled');
    }
    
}

resetButton.onclick = () => {
    clearInterval(countDown);
    // set the disabled features back
    resetButton.setAttribute('disabled', 'true');

    // the input will be back to nothing
    input.value = '';

    // most important part: display the values
    dd.innerHTML = '00';
    hh.innerHTML = '00';
    mm.innerHTML = '00';
    ss.innerHTML = '00';

}

const fireworks = new Fireworks(fireworkContainer, {
    speed: 4,
    acceleration: 1.05,
    friction: 1,
    gravity: 4,
    particles: 400,
    explosion: 10
})

fireworks.start()