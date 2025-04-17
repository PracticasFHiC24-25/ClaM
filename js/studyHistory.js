new Vue({
    el: '#app',
    data: {
        recentSessions: getRecentSessions(),
        previousSessions: getPreviousSessions(),
    }
});

// Function to get recent sessions
function getRecentSessions() {
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

// Function to get previous sessions
function getPreviousSessions() {
    return [
        {
          label: '4 d\'Abril, 2025',
          study: '65%',
          studyLeft: '35%',
          warmup: '80%',
          warmupLeft: '20%',
          rest: '60%',
          restLeft: '40%',
          total: '00h 45m'
        },
        {
          label: '5 d\'Abril, 2025',
          study: '55%',
          studyLeft: '45%',
          warmup: '90%',
          warmupLeft: '10%',
          rest: '75%',
          restLeft: '25%',
          total: '00h 39m'
        },
        {
          label: '6 d\'Abril, 2025',
          study: '70%',
          studyLeft: '30%',
          warmup: '88%',
          warmupLeft: '12%',
          rest: '65%',
          restLeft: '35%',
          total: '00h 50m'
        },
        {
          label: '7 d\'Abril, 2025',
          study: '60%',
          studyLeft: '40%',
          warmup: '85%',
          warmupLeft: '15%',
          rest: '70%',
          restLeft: '30%',
          total: '00h 42m'
        },
        {
          label: '9 d\'Abril, 2025',
          study: '50%',
          studyLeft: '50%',
          warmup: '75%',
          warmupLeft: '25%',
          rest: '80%',
          restLeft: '20%',
          total: '00h 38m'
        },
        {
          label: '12 d\'Abril, 2025',
          study: '68%',
          studyLeft: '32%',
          warmup: '82%',
          warmupLeft: '18%',
          rest: '77%',
          restLeft: '23%',
          total: '00h 47m'
        },
        {
          label: '13 d\'Abril, 2025',
          study: '62%',
          studyLeft: '38%',
          warmup: '78%',
          warmupLeft: '22%',
          rest: '73%',
          restLeft: '27%',
          total: '00h 44m'
        }
      ]
}