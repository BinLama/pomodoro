const timerState = {
    end: "end",
    study: "study",
    long_relax: "long relax",
    relax: "relax",
};
/*

@params

*/
export default class TimeTracker {
    constructor(study, relax, longRelax, maxIterLimit, breakInterval, time, playBtn, pauseBtn, studySound, restSound) {
        // study time
        this.study = study;
        // relax time
        this.relax = relax;
        // how many intervals have passed
        this.intervalCounter = 0;
        // relax for 15min
        this.longRelax = longRelax;
        // how many times should relax and relax pass
        this.maxIterLimit = maxIterLimit;
        // after how many interval should you get a big rest
        this.breakInterval = breakInterval;
        this.secRemaining = this.study * 60;
        // this.secRemaining = this.study * 3;
        // sounds
        this.studySound = studySound;
        this.restSound = restSound;
        // access to timer
        this.time = time;
        this.minutes = this.time.querySelector("#minutes");
        this.seconds = this.time.querySelector("#seconds");
        // access controls
        this.playBtn = playBtn;
        this.pauseBtn = pauseBtn;
        // helper variables
        this.timeOutIntervalSetter = undefined;
        this.expectedMilliseconds = null;
        this.milliseconds = 1000;
        this.timerType = timerState.study;
        this.blinkCounter = 3;
        // binding functions
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.step = this.step.bind(this);
        this.setUp = this.setUp.bind(this);
        this.countDown = this.countDown.bind(this);
        this.changeState = this.changeState.bind(this);
        this.showLight = this.showLight.bind(this);
        this.transitionDelay = this.transitionDelay.bind(this);
        this.timerStudySound = this.timerStudySound.bind(this);
        this.timerRestSound = this.timerRestSound.bind(this);
    }
    // render the data
    render(element, value) {
        element.textContent = value.toString().padStart(2, "0");
    }
    // change the state that the pomodoro is in.
    changeState() {
        if (this.intervalCounter === this.maxIterLimit) {
            this.timerType = timerState.end;
        }
        else if (this.intervalCounter < this.maxIterLimit &&
            this.intervalCounter > 0) {
            if (this.timerType === timerState.relax ||
                this.timerType === timerState.long_relax) {
                this.timerType = timerState.study;
            }
            else if (this.intervalCounter % this.breakInterval === 0 &&
                this.intervalCounter > 0 &&
                this.timerType !== timerState.long_relax) {
                this.timerType = timerState.long_relax;
                console.log("long relax");
            }
            else {
                this.timerType = timerState.relax;
            }
        }
    }
    // show light
    showLight() {
        let color;
        let bodyStyle = getComputedStyle(document.body);
        console.log(this.timerType);
        if (this.timerType === timerState.relax ||
            this.timerType === timerState.long_relax) {
            color = bodyStyle.getPropertyValue("--clr-go-pmdr");
        }
        else {
            color = bodyStyle.getPropertyValue("--clr-warning-pmdr");
        }
        console.log(color);
        (this.time.parentElement).style.backgroundColor = color;
    }
    // hide light
    hideLight() {
        (this.time.parentElement).style.backgroundColor = `var(--clr-timer-scr-pmdr)`;
    }
    // timer countdown
    countDown() {
        if (this.secRemaining <= 0) {
            return;
        }
        if (this.timerType === timerState.study &&
            this.secRemaining === this.study * 60) {
            this.intervalCounter += 1;
            console.log(`interval: ${this.intervalCounter}`);
        }
        this.secRemaining -= 1;
        // time
        let second = this.secRemaining % 60;
        let minute = Math.floor(this.secRemaining / 60);
        this.render(this.seconds, second);
        if (second === 59) {
            this.render(this.minutes, minute);
        }
        console.log(this.secRemaining);
    }
    // timer countdown tracker
    // got help from https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript
    step() {
        let drift = Date.now() - this.expectedMilliseconds;
        if (drift > this.expectedMilliseconds) {
            console.warn("The drift exceeded the interval.");
        }
        this.countDown();
        if (this.secRemaining === 0) {
            clearInterval(this.timeOutIntervalSetter);
            // call transition
            this.expectedMilliseconds += this.milliseconds;
            this.timeOutIntervalSetter = setTimeout(this.transitionDelay, Math.max(0, this.milliseconds - drift));
        }
        else {
            this.expectedMilliseconds += this.milliseconds;
            this.timeOutIntervalSetter = setTimeout(this.step, Math.max(0, this.milliseconds - drift));
        }
    }
    // set the transition things
    transitionDelay() {
        let drift = Date.now() - this.expectedMilliseconds;
        let showLightTimeout;
        let hideLightTimeout;
        this.changeState();
        console.log(this.timerType);
        if (this.timerType == timerState.study) {
            this.timerStudySound();
        }
        else {
            this.timerRestSound();
        }
        // background light blinker
        for (let i = 0; i < this.blinkCounter; i++) {
            showLightTimeout = 100 + 400 * i;
            hideLightTimeout = 300 + 400 * i;
            setTimeout(this.showLight, showLightTimeout);
            setTimeout(this.hideLight, hideLightTimeout);
        }
        // render the relax values
        if (this.timerType === timerState.relax) {
            this.secRemaining = this.relax * 60;
            this.render(this.minutes, this.relax);
            console.log("relax time start");
        }
        else if (this.timerType === timerState.study) {
            this.secRemaining = this.study * 60;
            this.render(this.minutes, this.study);
            console.log("study time start");
        }
        else if (this.timerType === timerState.long_relax) {
            this.secRemaining = this.longRelax * 60;
            this.render(this.minutes, this.longRelax);
            console.log("long break start");
        }
        else {
            console.log("timer over");
            clearInterval(this.timeOutIntervalSetter);
            this.reset();
            // change play pause btn
            if (this.playBtn.style.display === "none") {
                this.pauseBtn.style.display = "none";
                this.playBtn.style.display = "block";
            }
            return;
        }
        // run step again
        this.expectedMilliseconds += this.milliseconds;
        this.timeOutIntervalSetter = setTimeout(this.step, Math.max(0, this.milliseconds - drift));
    }
    // play btn click
    play() {
        let drift = Date.now();
        this.expectedMilliseconds = Date.now();
        // if (!this.expectedMilliseconds) {
        // }
        drift -= this.expectedMilliseconds;
        console.log(drift);
        console.log(this.milliseconds - drift);
        this.expectedMilliseconds = Date.now() + this.milliseconds;
        this.timeOutIntervalSetter = setTimeout(this.step, Math.max(0, this.milliseconds - drift));
    }
    // pause btn click
    pause() {
        clearInterval(this.timeOutIntervalSetter);
    }
    // reset btn click
    reset() {
        clearInterval(this.timeOutIntervalSetter);
        this.render(this.minutes, this.study);
        this.render(this.seconds, 0);
        this.secRemaining = this.study * 60;
        this.intervalCounter = 0;
        this.timerType = "study";
    }
    // This is the first render. Since, we don't want user
    // to have access to variables, we want to use this.
    setUp() {
        this.render(this.minutes, this.study);
    }
    async timerStudySound() {
        console.log(this.studySound);
        let audio = new Audio(`../sounds/${this.studySound}.mp3`);
        audio.play();
        console.log("Music played");
    }
    async timerRestSound() {
        console.log(this.restSound);
        let audio = new Audio(`../sounds/${this.restSound}.mp3`);
        audio.play();
        console.log(" REst Music played");
    }
    // setters
    set changeStudyTime(study) {
        this.study = study;
    }
    set changeRestTime(relax) {
        this.relax = relax;
    }
    set changeLongRestTime(longRelax) {
        this.longRelax = longRelax;
    }
    set changeMaxIterLimit(maxIterLimit) {
        this.maxIterLimit = maxIterLimit;
    }
    set changeBreakInterval(breakInterval) {
        this.breakInterval = breakInterval;
    }
    set changeStudySound(studySound) {
        this.studySound = studySound;
    }
    set changeRestSound(restSound) {
        this.restSound = restSound;
    }
}
