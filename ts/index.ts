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

const timer = new TimeTracker(
    opt.study,
    opt.relax,
    opt.longRelax,
    opt.maxIterLimit,
    opt.breakInterval,
    opt.time,
    opt.play,
    opt.pause,
    opt.studySound,
    opt.restSound
);

// View
function toggleClass(element: Element, classname: string): void {
    element.classList.toggle(classname);
}

function changePausePlay(): void {
    // change to play
    if ((<HTMLElement>play).style.display === "none") {
        (<HTMLElement>pause).style.display = "none";
        (<HTMLElement>play).style.display = "block";
        // TODO: implement pause actions like stopping the
        // timer
        // initalizing the timer
        timer.pause();
    } else {
        (<HTMLElement>play).style.display = "none";
        (<HTMLElement>pause).style.display = "block";
        // TODO: implement the play actions like starting the timer
        // const timer = new TimeTracker();
        // timer.render(timer.minutes, timer.study);
        timer.play();
    }
}

function changeRestart(): void {
    if ((<HTMLElement>play).style.display === "none") {
        (<HTMLElement>pause).style.display = "none";
        (<HTMLElement>play).style.display = "block";
    }
    timer.reset();
}

// show specific section (right now either pomodoro or settings)
function showSection(id: string): void {
    if (sections) {
        sections.forEach((sect: Element) => {
            if ((<HTMLElement>sect).dataset.type === id) {
                sect.classList.add("show");
                return;
            }
            sect.classList.remove("show");
        });
    }
}

function changeHighlight(type: string): void {
    if (links) {
        links.forEach((link) => {
            if ((<HTMLElement>link).dataset.type === type) {
                (<HTMLElement>link.parentElement).classList.add("current");
                return;
            }
            (<HTMLElement>link.parentElement).classList.remove("current");
        });
    }
}

function showSelected(id: string) {
    showSection(<string>id);
    changeHighlight(<string>id);
}

// background and nav
const nav_bar: Element | null = document.querySelector(".nav__toggle");
const show_links: Element | null = document.querySelector(".links");
const bg_mode: Element | null = document.querySelector(".toggle");
const changeMode: Element | null = document.querySelector(".cover");
const links: Element[] | null = Array.from(
    document.querySelectorAll(".links li a")
);

// Controls
const playPause = document.getElementById("playpause");
const play: Element | null = document.getElementById("play");
const pause: Element | null = document.getElementById("pause");
const restart: Element | null = document.getElementById("reset");
const setting: Element | null = document.getElementById("setting");

// setting and pomodoro
const sections: Element[] | null = Array.from(
    document.querySelectorAll(".section")
);
const cancel_setting: Element | null = document.querySelector(".btn__cancel");
const btns: Element[] | null = Array.from(document.querySelectorAll(".btn"));
const time: Element | null = document.getElementById("time");

// light/dark mdoe
const prefersLightScheme: MediaQueryList = window.matchMedia(
    "(prefers-color-scheme: light)"
);

// changing to light mode based on OS settings
if (prefersLightScheme.matches) {
    // add light mode on body
    document.body.classList.add("light_mode");
    // change the toggle
    (<HTMLElement>changeMode).classList.add("light");
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
        const body: Element = document.body;

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
        const id: string | undefined = (<HTMLElement>e.currentTarget).dataset
            .id;
        showSelected(<string>id);
    });
}

if (cancel_setting) {
    cancel_setting.addEventListener("click", (e) => {
        showSelected("pomodoro");
    });
}

if (links) {
    links.forEach((link) => {
        (<HTMLElement>link).addEventListener("click", (e) => {
            const type = (<HTMLElement>e.target).dataset.type;
            showSelected(<string>type);
        });
    });
}

timer.setUp();
