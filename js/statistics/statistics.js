new Vue({
  el: '#app',
  data: {
    // First chart, showing study minutes over the last 7 days
    chart1: null,
    chart1Data: {
      labels: getLast7Days(),
      datasets: [{
        label: '',
        data: getStudyMinutes7Days(),
        backgroundColor: '#72C5FF'
      }]
    },
    // Second chart, showing study time distribution for the last 2 study sessions
    dataChart2: getLast2StudySessions(),
    // Data for the third chart, the weekly goals progress
    weekProgress: getWeeklyProgress(),
    // Data for the last line chart, showing the week progress
    weekProgressGoals: {
      progress: getWeeklyProgressGoals(),
      left: 100 - getWeeklyProgressGoals()
    }
  },
  mounted() {
    this.renderChart1();
  },
  methods: {
    // Function to render the first chart
    renderChart1() {
      const ctx = document.getElementById('barChart').getContext('2d');
      this.chart1 = new Chart(ctx, {
        type: 'bar',
        data: this.chart1Data,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: '#333',
                callback: function(value) {
                  return value + ' min';
                }
              }
            },
            x: {
              ticks: {
                color: '#333'
              }
            }
          },
          plugins: {
            legend: {
              display: false,
              labels: {
                color: '#333'
              }
            },
            tooltip: {
              bodyColor: '#333',
              titleColor: '#111'
            }
          }
        }
      });
    }    
  }
});

// Function to get the last 7 days in 'MMM DD' format
function getLast7Days() {
  const days = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const day = new Date();
    day.setDate(today.getDate() - i);

    const options = { month: 'short', day: 'numeric' };
    days.push(day.toLocaleDateString(undefined, options));
  }

  return days;
}

// Function to get study minutes for the last 7 days
function getStudyMinutes7Days() {
  return [45, 32, 73, 34, 23, 50, 41];
}

// Function to get the last 2 study sessions data
function getLast2StudySessions() {
  return [{
      label: 'Avui',
      study: '60%',
      studyLeft: '40%',
      warmup: '85%',
      warmupLeft: '15%',
      rest: '70%',
      restLeft: '30%',
      total: '00h 41m'
    },
    {
      label: 'Ahir',
      study: '72%',
      studyLeft: '28%',
      warmup: '90%',
      warmupLeft: '10%',
      rest: '70%',
      restLeft: '30%',
      total: '00h 50m'
    }]
}

// Function to get the weekly progress data (responsive with the current day)
function getWeeklyProgress() {
  const days = ['Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds', 'Dg'];
  const today = (new Date().getDay() + 6) % 7; // 0 (Mon) to 6 (Sun), adjusted because americans start the week on Sunday
  const fullData = {
    'Dl': 100,
    'Dt': 80,
    'Dc': 60,
    'Dj': 100,
    'Dv': 90,
    'Ds': 70,
    'Dg': 50
  };

  // Iterates through days (value and index) and checks if the day is before or equal to today
  // If it is, keeps the value; if not, sets it to 0
  return days.map((day, index) => {
    const percent = fullData[day];
    // Check if the day is before or equal to today
    const isPastOrToday = index % 7 <= today;
    return {
      label: day,
      percent: isPastOrToday ? percent : 0
    };
  });
}

// Function to return the weekly progress goals
function getWeeklyProgressGoals() {
  return 45;
}