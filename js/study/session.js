new Vue({
    el: '#app',
    data: {
        // Timer settings
        warmUpTime: 10 * 60, // 10 minutes
        practiceTime: 30 * 60, // 30 minutes (full practice time)
        restTime: 5 * 60, // 5 minutes

        // Current state
        currentTime: 0,
        timer: null,
        isPaused: false,
        sessionActive: false,
        currentPhase: 'warm-up', // Possible values: 'warm-up', 'practice-1', 'rest', 'practice-2', 'end'

        // Flag to determine which page we're on
        isConfigPage: false,

        // Content for different phases
        warm_exercises: [
            { image: '/images/partitura.png', title: 'Partitura escalfament 1' },
            { image: '/images/partitura.png', title: 'Partitura escalfament 2' },
            { image: '/images/partitura.png', title: 'Partitura escalfament 3' },
            { image: '/images/partitura.png', title: 'Partitura escalfament 4' },
            { image: '/images/partitura.png', title: 'Partitura escalfament 5' }
        ],
        practice_exercises: [
            { image: '/images/partitura.png', title: 'Exercici 1' },
            { image: '/images/partitura.png', title: 'Exercici 2' },
            { image: '/images/partitura.png', title: 'Exercici 3' },
            { image: '/images/partitura.png', title: 'Exercici 4' },
            { image: '/images/partitura.png', title: 'Exercici 5' }
        ]
    },
    computed: {
        phaseTitle() {
            switch (this.currentPhase) {
                case 'warm-up': return 'Escalfament';
                case 'practice-1': return 'Pràctica (Primera part)';
                case 'rest': return 'Descans';
                case 'practice-2': return 'Pràctica (Segona part)';
                case 'end': return 'Finalitzat';
                default: return 'Sessió';
            }
        },
        showAccordion() {
            // Only show accordion during warm-up and practice phases
            return this.currentPhase === 'warm-up' ||
                this.currentPhase === 'practice-1' ||
                this.currentPhase === 'practice-2';
        },
        currentExercises() {
            // Return the appropriate exercises based on current phase
            if (this.currentPhase === 'warm-up') {
                return this.warm_exercises;
            } else if (this.currentPhase === 'practice-1' || this.currentPhase === 'practice-2') {
                return this.practice_exercises;
            }
            return [];
        },
        accordionId() {
            // Return different accordion IDs for different phases
            if (this.currentPhase === 'warm-up') {
                return 'accordionEscalfament';
            } else {
                return 'accordionPractice';
            }
        },
        phaseBackgroundClass() {
            // Return CSS class based on the current phase
            switch (this.currentPhase) {
                case 'warm-up': return 'warm-up-background';
                case 'practice-1':
                case 'practice-2': return 'practice-background';
                case 'rest': return 'rest-background';
                case 'end': return 'end-background';
                default: return '';
            }
        }
    },
    watch: {
        // Watch for phase changes to update the background
        currentPhase: {
            immediate: true,
            handler(newPhase) {
                if (!this.isConfigPage) {
                    this.updateBackgroundColor();
                }
            }
        }
    },
    mounted() {
        // Detect which page we're on based on URL or HTML structure
        this.isConfigPage = window.location.pathname.includes('configSession.html') ||
            document.querySelector('.session-title') !== null;

        if (this.isConfigPage) {
            // Load saved settings if available
            this.loadSettings();
        } else {
            // Initialize the session page
            this.initPhase(this.currentPhase);
            // Set initial background
            this.updateBackgroundColor();
        }
    },
    methods: {
        // Configuration page methods
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
            // Save settings whenever they change
            this.saveSettings();
        },
        decreaseTime(type) {
            if (type === 'warmUp' && this.warmUpTime > 60) {
                this.warmUpTime -= 60; // Subtract 1 minute
            } else if (type === 'practice' && this.practiceTime > 60) {
                this.practiceTime -= 60; // Subtract 1 minute
            } else if (type === 'rest' && this.restTime > 60) {
                this.restTime -= 60; // Subtract 1 minute
            }
            // Save settings whenever they change
            this.saveSettings();
        },
        startSession() {
            // Save current settings before starting the session
            this.saveSettings();
            // Navigate to the session page
            window.location.href = '/pages/study/studySession.html';
        },

        // Session page methods
        initPhase(phase) {
            this.currentPhase = phase;

            // Load settings first to ensure we have the latest values
            this.loadSettings();

            // Set the appropriate time based on the phase
            switch (phase) {
                case 'warm-up':
                    this.currentTime = this.warmUpTime;
                    break;
                case 'practice-1':
                case 'practice-2':
                    this.currentTime = this.practiceTime / 2; // Half practice time for each practice session
                    break;
                case 'rest':
                    this.currentTime = this.restTime;
                    break;
                case 'end':
                    this.currentTime = 0;
                    break;
            }

            this.startTimer();
        },
        startTimer() {
            clearInterval(this.timer); // Clear any existing timer

            this.sessionActive = true;
            this.timer = setInterval(() => {
                if (!this.isPaused && this.currentTime > 0) {
                    this.currentTime--;
                } else if (this.currentTime <= 0) {
                    this.moveToNextPhase();
                }
            }, 1000);
        },
        moveToNextPhase() {
            clearInterval(this.timer);
            this.timer = null;

            // Determine the next phase
            switch (this.currentPhase) {
                case 'warm-up':
                    this.initPhase('practice-1');
                    break;
                case 'practice-1':
                    this.initPhase('rest');
                    break;
                case 'rest':
                    this.initPhase('practice-2');
                    break;
                case 'practice-2':
                    this.initPhase('end');
                    break;
                case 'end':
                    this.endSession();
                    break;
            }

            // Update background color for new phase
            this.updateBackgroundColor();
        },
        togglePause() {
            this.isPaused = !this.isPaused;
        },
        endSession() {
            clearInterval(this.timer);
            this.timer = null;
            this.sessionActive = false;
            window.location.href = '/pages/study/configSession.html';
        },

        // Background color update method
        updateBackgroundColor() {
            // Remove all previous background classes
            document.body.classList.remove(
                'warm-up-background',
                'practice-background',
                'rest-background',
                'end-background'
            );

            // Add the new background class
            document.body.classList.add(this.phaseBackgroundClass);
        },

        // Common methods for settings persistence
        saveSettings() {
            // Save settings to localStorage
            const settings = {
                warmUpTime: this.warmUpTime,
                practiceTime: this.practiceTime,
                restTime: this.restTime
            };
            localStorage.setItem('studySessionSettings', JSON.stringify(settings));
        },
        loadSettings() {
            // Load settings from localStorage
            const savedSettings = localStorage.getItem('studySessionSettings');
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                this.warmUpTime = settings.warmUpTime;
                this.practiceTime = settings.practiceTime;
                this.restTime = settings.restTime;
            }
        }
    }
});