let timerdisplay = document.querySelector('.timerdisplay');
let stopbtn = document.getElementById('stopbtn');
let startbtn = document.getElementById('startbtn');
let resetbtn = document.getElementById('resetbtn');
let lapbtn = document.getElementById('lapbtn');
let lapsContainer = document.querySelector('.laps');

let msec = 0;
let secs = 0;
let mins = 0;
let timerId = null;

// Format time with leading zeros
function formatTime(unit) {
    return unit < 10 ? `0${unit}` : unit;
}

// Start Timer
startbtn.addEventListener('click', function () {
    if (timerId !== null) {
        clearInterval(timerId);
    }
    timerId = setInterval(startTimer, 10); // Run every 10ms
});

// Stop Timer
stopbtn.addEventListener('click', function () {
    clearInterval(timerId);
});

// Reset Timer
resetbtn.addEventListener('click', function () {
    clearInterval(timerId);
    timerdisplay.innerHTML = `00 : 00 : 00`;
    lapsContainer.innerHTML = ""; // Clear laps
    msec = secs = mins = 0; // Reset variables
});

// Record Lap Time
lapbtn.addEventListener('click', function () {
    let lapTime = `${formatTime(mins)} : ${formatTime(secs)} : ${formatTime(msec)}`;
    let lapEntry = document.createElement('div');
    lapEntry.textContent = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
    lapsContainer.appendChild(lapEntry);
});

// Timer Logic
function startTimer() {
    msec++;
    if (msec === 100) {
        msec = 0;
        secs++;
        if (secs === 60) {
            secs = 0;
            mins++;
        }
    }
    timerdisplay.innerHTML = `${formatTime(mins)} : ${formatTime(secs)} : ${formatTime(msec)}`;
}

// Save and Load Timer State
window.addEventListener('beforeunload', function () {
    localStorage.setItem('timerState', JSON.stringify({ mins, secs, msec }));
});

window.addEventListener('load', function () {
    let savedState = JSON.parse(localStorage.getItem('timerState'));
    if (savedState) {
        mins = savedState.mins;
        secs = savedState.secs;
        msec = savedState.msec;
        timerdisplay.innerHTML = `${formatTime(mins)} : ${formatTime(secs)} : ${formatTime(msec)}`;
    }
});
