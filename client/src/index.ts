import TimeTracker from "./Timer.js";

// background and nav
const nav_bar: Element | null = getElement(".nav__toggle");
const link_container: Element | null = getElement(".links__container");
const link_c: Element | null = getElement(".links");
const bg_mode: Element | null = getElement(".toggle");
const changeMode: Element | null = getElement(".cover");
const links: Element[] | null = getElements(".links a");

// Modal
const playPause = getElement("#playpause");

// document.getElementById("playpause");
const play: Element | null = getElement("#play");
const pause: Element | null = getElement("#pause");
const restart: Element | null = getElement("#reset");
const setting: Element | null = getElement("#setting");

// setting and pomodoro
const sections: Element[] | null = Array.from(
  document.querySelectorAll(".section")
);
const cancel_setting: Element | null = getElement(".btn__cancel");
const save_setting: Element | null = getElement(".btn__save");

// timer - interval tracker
// const interval_pass = getElement("#int_pass");
// const interval_total = getElement("#int_total");

// console.log(interval_pass);

// light/dark mdoe
const prefersLightScheme: MediaQueryList = window.matchMedia(
  "(prefers-color-scheme: light)"
);

let opt = {
  study: 25,
  relax: 5,
  longRelax: 15,
  maxIterLimit: 5,
  breakInterval: 4,
  time: getElement("#time"),
  play: getElement("#play"),
  pause: getElement("#pause"),
  timerInterval: getElement(".timer__interval"),
  studySound: "digital_alarm",
  restSound: "key_chimes",
};

// let opt = {
//     study: 0.1,
//     relax: 0.1,
//     longRelax: 0.1,
//     maxIterLimit: 3,
//     breakInterval: 2,
//     time: document.getElementById("time"),
//     play: document.getElementById("play"),
//     pause: document.getElementById("pause"),
//     timerInterval: getElement(".timer__interval"),
//     studySound: "digital_alarm",
//     restSound: "key_chimes",
// };

const timer = new TimeTracker(
  opt.study,
  opt.relax,
  opt.longRelax,
  opt.maxIterLimit,
  opt.breakInterval,
  opt.time,
  opt.timerInterval,
  opt.play,
  opt.pause,
  opt.studySound,
  opt.restSound
);

// helpers
function getElement(element: string) {
  const data = document.querySelector(element);
  if (data) return <HTMLElement>data;

  throw Error(
    `Cannot find the element. Please make sure "${element}" is a correct query.`
  );
}

function getElements(element: string) {
  const data = document.querySelectorAll(element);
  if (data) return Array.from(data);

  throw Error(
    `Cannot find the element. Please make sure "${element}" is a correct query.`
  );
}
/* helpers end */
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
        (<HTMLElement>link).classList.add("current");
        return;
      }
      (<HTMLElement>link).classList.remove("current");
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
      (document.getElementById("long_break_after") as HTMLInputElement).value
    ),
    studySound: (document.getElementById("start_sound") as HTMLInputElement)
      .value,
    restSound: (document.getElementById("end_sound") as HTMLInputElement).value,
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
if (nav_bar && link_c) {
  nav_bar.addEventListener("click", () => {
    let link_c_height = (<HTMLElement>link_c).getBoundingClientRect().height;
    let link_container_height = (<HTMLElement>(
      link_container
    )).getBoundingClientRect().height;

    if (link_container_height === 0) {
      (<HTMLElement>link_container).style.height = `${link_c_height}px`;
    } else {
      (<HTMLElement>link_container).style.height = `0px`;
    }
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
    const id: string | undefined = (<HTMLElement>e.currentTarget).dataset.id;
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
