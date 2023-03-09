import TimeTracker from "./Timer.js";
// Modal
// let opt = {
//     study: 25,
//     relax: 5,
//     longRelax: 15,
//     maxIterLimit: 10,
//     breakInterval: 4,
//     time: document.getElementById("time"),
// play: document.getElementById("play"),
// pause: document.getElementById("pause"),
// };
let opt = {
    study: 1,
    relax: 1,
    longRelax: 2,
    maxIterLimit: 3,
    breakInterval: 2,
    time: document.getElementById("time"),
    play: document.getElementById("play"),
    pause: document.getElementById("pause"),
    studySound: "bell.mp3",
    restSound: "bell.mp3",
};
const timer = new TimeTracker(opt.study, opt.relax, opt.longRelax, opt.maxIterLimit, opt.breakInterval, opt.time, opt.play, opt.pause, opt.studySound, opt.restSound);
// View
function toggleClass(element, classname) {
    element.classList.toggle(classname);
}
function changePausePlay() {
    // change to play
    if (play.style.display === "none") {
        pause.style.display = "none";
        play.style.display = "block";
        // TODO: implement pause actions like stopping the
        // timer
        // initalizing the timer
        timer.pause();
    }
    else {
        play.style.display = "none";
        pause.style.display = "block";
        // TODO: implement the play actions like starting the timer
        // const timer = new TimeTracker();
        // timer.render(timer.minutes, timer.study);
        timer.play();
    }
}
function changeRestart() {
    if (play.style.display === "none") {
        pause.style.display = "none";
        play.style.display = "block";
    }
    timer.reset();
}
// show specific section (right now either pomodoro or settings)
function showSection(id) {
    if (sections) {
        sections.forEach((sect) => {
            if (sect.dataset.type === id) {
                sect.classList.add("show");
                return;
            }
            sect.classList.remove("show");
        });
    }
}
function changeHighlight(type) {
    if (links) {
        links.forEach((link) => {
            if (link.dataset.type === type) {
                link.parentElement.classList.add("current");
                return;
            }
            link.parentElement.classList.remove("current");
        });
    }
}
function showSelected(id) {
    showSection(id);
    changeHighlight(id);
}
// background and nav
const nav_bar = document.querySelector(".nav__toggle");
const show_links = document.querySelector(".links");
const bg_mode = document.querySelector(".toggle");
const changeMode = document.querySelector(".cover");
const links = Array.from(document.querySelectorAll(".links li a"));
// Controls
const playPause = document.getElementById("playpause");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const restart = document.getElementById("reset");
const setting = document.getElementById("setting");
// setting and pomodoro
const sections = Array.from(document.querySelectorAll(".section"));
const cancel_setting = document.querySelector(".btn__cancel");
const btns = Array.from(document.querySelectorAll(".btn"));
const time = document.getElementById("time");
// light/dark mdoe
const prefersLightScheme = window.matchMedia("(prefers-color-scheme: light)");
// changing to light mode based on OS settings
if (prefersLightScheme.matches) {
    // add light mode on body
    document.body.classList.add("light_mode");
    // change the toggle
    changeMode.classList.add("light");
}
// showing all the links
if (nav_bar && show_links) {
    nav_bar.addEventListener("click", (e) => {
        toggleClass(show_links, "show_links");
    });
}
// chaning to dark or light mode
if (bg_mode && changeMode) {
    bg_mode.addEventListener("click", (e) => {
        const body = document.body;
        toggleClass(changeMode, "light");
        toggleClass(body, "light_mode");
    });
}
// play/pause btn actions
if (playPause) {
    playPause.addEventListener("click", (e) => {
        changePausePlay();
    });
}
// reset btn actions
if (restart) {
    restart.addEventListener("click", (e) => {
        changeRestart();
    });
}
if (setting) {
    setting.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset
            .id;
        showSelected(id);
    });
}
if (cancel_setting) {
    cancel_setting.addEventListener("click", (e) => {
        showSelected("pomodoro");
    });
}
if (links) {
    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            const type = e.target.dataset.type;
            showSelected(type);
        });
    });
}
timer.setUp();
