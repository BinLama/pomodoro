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
    private study: number;
    private relax: number;
    private intervalCounter: number;
    private longRelax: number;
    private maxIterLimit: number;
    private breakInterval: number;
    private secRemaining: number;
    private studySound: string;
    private restSound: string;

    // Timer
    private timerType: string;
    private time: HTMLElement | null;
    private minutes: HTMLElement | null;
    private seconds: HTMLElement | null;
    private timerInterval: HTMLElement | null;
    private intervalPass: HTMLElement | null;
    private intervalTotal: HTMLElement | null;

    // controls
    private playBtn: HTMLElement | null;
    private pauseBtn: HTMLElement | null;

    // helper var
    private timeOutIntervalSetter: number | undefined;
    private expectedMilliseconds: number | null;
    private milliseconds: number;
    private blinkCounter: number;

    constructor(
        study: number,
        relax: number,
        longRelax: number,
        maxIterLimit: number,
        breakInterval: number,
        time: HTMLElement | null,
        timerInterval: HTMLElement | null,
        playBtn: HTMLElement | null,
        pauseBtn: HTMLElement | null,
        studySound: string,
        restSound: string
    ) {
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

        // sounds
        this.studySound = studySound;
        this.restSound = restSound;

        // access to timer
        this.time = time;
        this.timerInterval = timerInterval;
        this.minutes = (<HTMLElement>this.time).querySelector("#minutes");
        this.seconds = (<HTMLElement>this.time).querySelector("#seconds");
        this.intervalPass = (<HTMLElement>this.timerInterval).querySelector(
            "#int_pass"
        );
        this.intervalTotal = (<HTMLElement>this.timerInterval).querySelector(
            "#int_total"
        );

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
    private render(element: HTMLElement | null, value: number): void {
        (<HTMLElement>element).textContent = Math.floor(value)
            .toString()
            .padStart(2, "0");
    }

    // change the state that the pomodoro is in.
    private changeState() {
        if (this.intervalCounter === this.maxIterLimit) {
            this.timerType = timerState.end;
        } else if (
            this.intervalCounter < this.maxIterLimit &&
            this.intervalCounter > 0
        ) {
            if (
                this.timerType === timerState.relax ||
                this.timerType === timerState.long_relax
            ) {
                this.timerType = timerState.study;
            } else if (
                this.intervalCounter % this.breakInterval === 0 &&
                this.intervalCounter > 0 &&
                this.timerType !== timerState.long_relax
            ) {
                this.timerType = timerState.long_relax;
                console.log("long relax");
            } else {
                this.timerType = timerState.relax;
            }
        }
    }

    // show light
    private showLight() {
        let color: string;
        let bodyStyle = getComputedStyle(document.body);

        console.log(this.timerType);

        if (
            this.timerType === timerState.relax ||
            this.timerType === timerState.long_relax
        ) {
            color = bodyStyle.getPropertyValue("--clr-go-pmdr");
        } else {
            color = bodyStyle.getPropertyValue("--clr-warning-pmdr");
        }

        console.log(color);
        (<HTMLElement>(
            (<HTMLElement>this.time).parentElement
        )).style.backgroundColor = color;
    }

    // hide light
    private hideLight() {
        (<HTMLElement>(
            (<HTMLElement>this.time).parentElement
        )).style.backgroundColor = `var(--clr-timer-scr-pmdr)`;
    }

    // timer countdown
    private countDown() {
        if (this.secRemaining <= 0) {
            return;
        }

        if (
            this.timerType === timerState.study &&
            this.secRemaining === this.study * 60
        ) {
            this.intervalCounter += 1;
            this.render(this.intervalPass, this.intervalCounter);

            console.log(`interval: ${this.intervalCounter}`);
        }

        this.secRemaining -= 1;

        // time
        let second = this.secRemaining % 60;
        let minute = this.secRemaining / 60;

        this.render(this.seconds, second);

        if (second === 59) {
            this.render(this.minutes, minute);
        }

        console.log(this.secRemaining);
    }

    // timer countdown tracker
    // got help from https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript
    private step() {
        let drift = Date.now() - <number>this.expectedMilliseconds;

        if (drift > <number>this.expectedMilliseconds) {
            console.warn("The drift exceeded the interval.");
        }

        this.countDown();

        if (this.secRemaining === 0) {
            clearInterval(this.timeOutIntervalSetter);

            // call transition
            (<number>this.expectedMilliseconds) += this.milliseconds;
            this.timeOutIntervalSetter = window.setTimeout(
                this.transitionDelay,
                Math.max(0, <number>this.milliseconds - drift)
            );
        } else {
            (<number>this.expectedMilliseconds) += this.milliseconds;
            this.timeOutIntervalSetter = window.setTimeout(
                this.step,
                Math.max(0, <number>this.milliseconds - drift)
            );
        }
    }

    // set the transition things
    private transitionDelay() {
        let drift = Date.now() - <number>this.expectedMilliseconds;
        let showLightTimeout;
        let hideLightTimeout;
        this.changeState();
        console.log(this.timerType);

        if (this.timerType == timerState.study) {
            this.timerStudySound();
        } else {
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
        } else if (this.timerType === timerState.study) {
            this.secRemaining = this.study * 60;
            this.render(this.minutes, this.study);

            console.log("study time start");
        } else if (this.timerType === timerState.long_relax) {
            this.secRemaining = this.longRelax * 60;
            this.render(this.minutes, this.longRelax);
            console.log("long break start");
        } else {
            console.log("timer over");
            clearInterval(this.timeOutIntervalSetter);
            this.reset();
            // change play pause btn
            if ((<HTMLElement>this.playBtn).style.display === "none") {
                (<HTMLElement>this.pauseBtn).style.display = "none";
                (<HTMLElement>this.playBtn).style.display = "block";
            }
            return;
        }

        // run step again
        (<number>this.expectedMilliseconds) += this.milliseconds;
        this.timeOutIntervalSetter = window.setTimeout(
            this.step,
            Math.max(0, <number>this.milliseconds - drift)
        );
    }

    // play btn click
    play() {
        let drift = Date.now();
        this.expectedMilliseconds = Date.now();
        drift -= <number>this.expectedMilliseconds;

        this.expectedMilliseconds = Date.now() + this.milliseconds;
        this.timeOutIntervalSetter = window.setTimeout(
            this.step,
            Math.max(0, <number>this.milliseconds - drift)
        );
    }

    // pause btn click
    pause() {
        clearInterval(this.timeOutIntervalSetter);
    }

    // reset btn click
    reset() {
        clearInterval(this.timeOutIntervalSetter);
        this.secRemaining = this.study * 60;
        this.intervalCounter = 0;
        this.timerType = "study";
        this.render(this.minutes, this.secRemaining / 60);
        this.render(this.seconds, this.secRemaining % 60);
        this.render(this.intervalPass, this.intervalCounter + 1);
    }

    // This is the first render. Since, we don't want user
    // to have access to variables, we want to use this.
    setUp() {
        // time
        this.render(this.seconds, this.secRemaining % 60);
        this.render(this.minutes, this.secRemaining / 60);
        this.render(this.intervalPass, this.intervalCounter + 1);
        this.render(this.intervalTotal, this.maxIterLimit);
    }

    private async timerStudySound() {
        console.log(this.studySound);
        let audio = new Audio(`../sounds/${this.studySound}.mp3`);
        audio.play();
        console.log("Music played");
    }

    private async timerRestSound() {
        console.log(this.restSound);
        let audio = new Audio(`../sounds/${this.restSound}.mp3`);
        audio.play();
        console.log(" REst Music played");
    }

    // getters
    get getStudyTime() {
        return this.study;
    }

    get getRestTime() {
        return this.relax;
    }

    get getLongRestTime() {
        return this.longRelax;
    }

    get getMaxIterLimit() {
        return this.maxIterLimit;
    }

    get getBreakInterval() {
        return this.breakInterval;
    }

    get getStudySound() {
        return this.studySound;
    }

    get getRestSound() {
        return this.restSound;
    }

    // setters
    set changeStudyTime(study: number) {
        this.study = study;
    }

    set changeRestTime(relax: number) {
        this.relax = relax;
    }

    set changeLongRestTime(longRelax: number) {
        this.longRelax = longRelax;
    }

    set changeMaxIterLimit(maxIterLimit: number) {
        this.maxIterLimit = maxIterLimit;
    }
    set changeBreakInterval(breakInterval: number) {
        this.breakInterval = breakInterval;
    }
    set changeStudySound(studySound: string) {
        this.studySound = studySound;
    }
    set changeRestSound(restSound: string) {
        this.restSound = restSound;
    }
}
