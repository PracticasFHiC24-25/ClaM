
new Vue({
    el: '#app',
    data: {
        warmUpTime: 10 * 60, // 10 minutes in seconds
        practiceTime: 30 * 60, // 30 minutes in seconds
        restTime: 5 * 60, // 5 minutes in seconds,
        currentTime: 15 * 60, // 15 minutes in seconds (as shown in the image)
        timer: null,
        isPaused: false,
        sessionActive: false,
        exercises: [
            { image: '/images/partitura.png', title: 'Partitura escalfament 1' },
            { image: '/images/partitura.png', title: 'Partitura escalfament 2' },
            { image: '/images/partitura.png', title: 'Partitura escalfament 3' },
            { image: '/images/partitura.png', title: 'Partitura escalfament 4' },
            { image: '/images/partitura.png', title: 'Partitura escalfament 5' }
        ]
    },
    mounted() {
        // Initialize the timer when the component mounts
        this.startTimer();
    },
    methods: {
        formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        },
        increaseTime(type) {
            if (type === 'warmUp') {
                this.warmUpTime += 60; // Add 1 minute
            } else if (type === 'practice') {
                this.practiceTime += 60; // Add 1 minute
            } else if (type === 'rest') {
                this.restTime += 60; // Add 1 minute
            }
        },
        decreaseTime(type) {
            if (type === 'warmUp' && this.warmUpTime > 60) {
                this.warmUpTime -= 60; // Subtract 1 minute
            } else if (type === 'practice' && this.practiceTime > 60) {
                this.practiceTime -= 60; // Subtract 1 minute
            } else if (type === 'rest' && this.restTime > 60) {
                this.restTime -= 60; // Subtract 1 minute
            }
        },
        startSession() {
            this.sessionActive = true;
            window.location.href = '/pages/studySession/studySession.html';
        },
        startTimer() {
            if (!this.timer) {
                this.sessionActive = true;
                this.timer = setInterval(() => {
                    if (!this.isPaused && this.currentTime > 0) {
                        this.currentTime--;
                    } else if (this.currentTime <= 0) {
                        this.endSession();
                    }
                }, 1000);
            }
        },
        togglePause() {
            this.isPaused = !this.isPaused;
        },
        endSession() {
            clearInterval(this.timer);
            this.timer = null;
            this.sessionActive = false;
            window.location.href = '/pages/studySession/configSession.html';
        }
    }
});