let timerdisplay = document.querySelector('.timerdisplay');
let stopbtn = document.getElementById('stopbtn');
let startbtn = document.getElementById('startbtn');
let resetbtn = document.getElementById('resetbtn');

let msec = 0;
let secs = 0;
let mins = 0;
let timerId = null;

startbtn.addEventListener('click', function () {
    if (timerId !== null) {
        clearInterval(timerId);
    }
    timerId = setInterval(startTimer, 10); // Run every 10ms
});

stopbtn.addEventListener('click', function () {
    clearInterval(timerId);
});

resetbtn.addEventListener('click', function () {
    clearInterval(timerId);
    timerdisplay.innerHTML = `00 : 00 : 00`;
    msec = secs = mins = 0; // Reset all variables
});

function startTimer() {
    msec++; // Increment milliseconds
    if (msec === 100) { // 100 intervals of 10ms = 1 second
        msec = 0; // Reset milliseconds
        secs++; // Increment seconds
        if (secs === 60) { // 60 seconds = 1 minute
            secs = 0; // Reset seconds
            mins++; // Increment minutes
        }
    }

    // Correct formatting for all time values
    let msecString = msec < 10 ? `0${msec}` : msec; // Milliseconds as two digits
    let secsString = secs < 10 ? `0${secs}` : secs; // Seconds as two digits
    let minsString = mins < 10 ? `0${mins}` : mins; // Minutes as two digits

    // Update the timer display
    timerdisplay.innerHTML = `${minsString} : ${secsString} : ${msecString}`;
}
