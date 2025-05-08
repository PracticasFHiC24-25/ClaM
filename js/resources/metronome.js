new Vue({
    el: '#app',
    data: {
        // Initial state when the page loads
        isPlaying: false,
        bttnStartStop: "/images/bttn_play.png",
        bpm: 100,
        minBPM: 40,
        maxBPM: 240,
        timer: null
    },
    methods: {
        changeMetronome() {
            if (this.isPlaying) {
                this.stopMetronome();
            } else {
                this.startMetronome();
            }
            this.isPlaying = !this.isPlaying;
        },
        startMetronome() {
            this.bttnStartStop = "/images/bttn_pause.png";
            this.startTimer();
        },
        stopMetronome() {
            this.bttnStartStop = "/images/bttn_play.png";
            this.stopTimer();
        },
        increaseBPM() {
            if (this.bpm < this.maxBPM) {
                this.bpm = Number(this.bpm) + 1;
                if (this.isPlaying) {
                    this.updateTimer();
                }
            }
        },
        decreaseBPM() {
            if (this.bpm > this.minBPM) {
                this.bpm = Number(this.bpm) - 1;
                if (this.isPlaying) {
                    this.updateTimer();
                }
            }
        },
        playClick() {
            const click1 = new Audio('audio/click.mp3');
            click1.play();
            console.log('Click sound played');
        },
        startTimer() {
            const interval = 60000 / this.bpm; // We calculate the interval in milliseconds
            this.timer = setInterval(this.playClick, interval); // Incializes the temporizer
        },
        stopTimer() {
            clearInterval(this.timer); // Stops the temporizer
            this.timer = null;
        },
        updateTimer() {
            this.stopTimer();
            this.startTimer(); 
        }
    },

    watch: {
        // Watcher for bpm changes when it is playing
        bpm(newBPM) {
            if (this.isPlaying) {
                this.updateTimer();
            }
        }
    }
});