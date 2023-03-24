import TimeTracker from "./Timer.js";
// background and nav
const nav_bar = getElement(".nav__toggle");
const link_container = getElement(".links__container");
const link_c = getElement(".links");
const bg_mode = getElement(".toggle");
const changeMode = getElement(".cover");
const links = getElements(".links a");
// Modal
const playPause = getElement("#playpause");
console.log(playPause);
// document.getElementById("playpause");
const play = getElement("#play");
const pause = getElement("#pause");
const restart = getElement("#reset");
const setting = getElement("#setting");
// setting and pomodoro
const sections = Array.from(document.querySelectorAll(".section"));
const cancel_setting = getElement(".btn__cancel");
const save_setting = getElement(".btn__save");
// timer - interval tracker
const interval_pass = getElement("#int_pass");
const interval_total = getElement("#int_total");
console.log(interval_pass);
// light/dark mdoe
const prefersLightScheme = window.matchMedia("(prefers-color-scheme: light)");
let opt = {
    study: 25,
    relax: 5,
    longRelax: 15,
    maxIterLimit: 10,
    breakInterval: 4,
    time: getElement("#time"),
    play: getElement("#play"),
    pause: getElement("#pause"),
    studySound: "digital_alarm",
    restSound: "key_chimes",
};
// let opt = {
//     study: 1,
//     relax: 1,
//     longRelax: 2,
//     maxIterLimit: 3,
//     breakInterval: 2,
//     time: document.getElementById("time"),
//     play: document.getElementById("play"),
//     pause: document.getElementById("pause"),
//     studySound: "digital_alarm",
//     restSound: "key_chimes",
// };
const timer = new TimeTracker(opt.study, opt.relax, opt.longRelax, opt.maxIterLimit, opt.breakInterval, opt.time, opt.play, opt.pause, opt.studySound, opt.restSound);
// helpers
function getElement(element) {
    const data = document.querySelector(element);
    if (data)
        return data;
    throw Error(`Cannot find the element. Please make sure "${element}" is a correct query.`);
}
function getElements(element) {
    const data = document.querySelectorAll(element);
    if (data)
        return Array.from(data);
    throw Error(`Cannot find the element. Please make sure "${element}" is a correct query.`);
}
/* helpers end */
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
                link.classList.add("current");
                return;
            }
            link.classList.remove("current");
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
if (nav_bar && link_c) {
    nav_bar.addEventListener("click", () => {
        let link_c_height = link_c.getBoundingClientRect()
            .height;
        let link_container_height = (link_container).getBoundingClientRect().height;
        if (link_container_height === 0) {
            link_container.style.height = `${link_c_height}px`;
        }
        else {
            link_container.style.height = `0px`;
        }
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
