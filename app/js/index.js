import TimeTracker from "./Timer.js";
// background and nav
const nav_bar = document.querySelector(".nav__toggle");
const show_links = document.querySelector(".links");
const bg_mode = document.querySelector(".toggle");
const changeMode = document.querySelector(".cover");
const links = Array.from(document.querySelectorAll(".links li a"));
// Modal
const playPause = document.getElementById("playpause");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const restart = document.getElementById("reset");
const setting = document.getElementById("setting");
// setting and pomodoro
const sections = Array.from(document.querySelectorAll(".section"));
const cancel_setting = document.querySelector(".btn__cancel");
const save_setting = document.querySelector(".btn__save");
// light/dark mdoe
const prefersLightScheme = window.matchMedia("(prefers-color-scheme: light)");
// let opt = {
//     study: 25,
//     relax: 5,
//     longRelax: 15,
//     maxIterLimit: 10,
//     breakInterval: 4,
//     time: document.getElementById("time"),
//     play: document.getElementById("play"),
//     pause: document.getElementById("pause"),
//     studySound: "digital_alarm",
//     restSound: "key_chimes",
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
    studySound: "digital_alarm",
    restSound: "key_chimes",
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
        timer.pause();
    }
    else {
        play.style.display = "none";
        pause.style.display = "block";
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
function setSavedData() {
    let change = false;
    let data = {
        study: parseInt(document.getElementById("study").value),
        relax: parseInt(document.getElementById("relax").value),
        longRelax: parseInt(document.getElementById("long_relax").value),
        maxIterLimit: parseInt(document.getElementById("num_intervals").value),
        breakInterval: parseInt(document.getElementById("long_break_after")
            .value),
        studySound: document.getElementById("start_sound")
            .value,
        restSound: document.getElementById("end_sound")
            .value,
    };
    console.log(data);
    console.log("Save");
    if (data.study !== timer.getStudyTime) {
        change = true;
        console.log("study change");
        timer.changeStudyTime = data.study;
        console.log(timer.getStudyTime);
    }
    if (data.relax !== timer.getRestTime) {
        change = true;
        console.log("relax change");
        timer.changeRestTime = data.relax;
    }
    if (data.longRelax !== timer.getLongRestTime) {
        change = true;
        console.log("long relax change");
        timer.changeLongRestTime = data.longRelax;
    }
    if (data.maxIterLimit !== timer.getMaxIterLimit) {
        change = true;
        console.log("maxIter change");
        timer.changeMaxIterLimit = data.maxIterLimit;
    }
    if (data.breakInterval !== timer.getBreakInterval) {
        change = true;
        console.log("break interval change");
        timer.changeBreakInterval = data.breakInterval;
    }
    if (data.studySound !== timer.getStudySound) {
        change = true;
        console.log("study sound change");
        timer.changeStudySound = data.studySound;
    }
    if (data.restSound !== timer.getRestSound) {
        change = true;
        console.log("rest sound change");
        timer.changeRestSound = data.restSound;
    }
    if (change) {
        changeRestart();
    }
    showSelected("pomodoro");
}
// Controller
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
    playPause.addEventListener("click", changePausePlay);
}
// reset btn actions
if (restart) {
    restart.addEventListener("click", changeRestart);
}
if (setting) {
    setting.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset
            .id;
        showSelected(id);
    });
}
if (cancel_setting) {
    cancel_setting.addEventListener("click", () => {
        showSelected("pomodoro");
    });
}
if (save_setting) {
    save_setting.addEventListener("click", setSavedData);
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
