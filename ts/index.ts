import TimeTracker from "./Timer.js";

// background and nav
const nav_bar: Element | null = document.querySelector(".nav__toggle");
const show_links: Element | null = document.querySelector(".links");
const bg_mode: Element | null = document.querySelector(".toggle");
const changeMode: Element | null = document.querySelector(".cover");
const links: Element[] | null = Array.from(
    document.querySelectorAll(".links li a")
);

// Modal
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
const save_setting: Element | null = document.querySelector(".btn__save");

// light/dark mdoe
const prefersLightScheme: MediaQueryList = window.matchMedia(
    "(prefers-color-scheme: light)"
);

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
        timer.pause();
    } else {
        (<HTMLElement>play).style.display = "none";
        (<HTMLElement>pause).style.display = "block";
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

function setSavedData() {
    let change = false;

    let data = {
        study: parseInt(
            (document.getElementById("study") as HTMLInputElement).value
        ),
        relax: parseInt(
            (document.getElementById("relax") as HTMLInputElement).value
        ),
        longRelax: parseInt(
            (document.getElementById("long_relax") as HTMLInputElement).value
        ),
        maxIterLimit: parseInt(
            (document.getElementById("num_intervals") as HTMLInputElement).value
        ),
        breakInterval: parseInt(
            (document.getElementById("long_break_after") as HTMLInputElement)
                .value
        ),
        studySound: (document.getElementById("start_sound") as HTMLInputElement)
            .value,
        restSound: (document.getElementById("end_sound") as HTMLInputElement)
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
    playPause.addEventListener("click", changePausePlay);
}

// reset btn actions
if (restart) {
    restart.addEventListener("click", changeRestart);
}

if (setting) {
    setting.addEventListener("click", (e) => {
        const id: string | undefined = (<HTMLElement>e.currentTarget).dataset
            .id;
        showSelected(<string>id);
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
        (<HTMLElement>link).addEventListener("click", (e) => {
            const type = (<HTMLElement>e.target).dataset.type;
            showSelected(<string>type);
        });
    });
}

timer.setUp();
