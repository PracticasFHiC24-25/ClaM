new Vue({
    el: '#app',
    data: {
        recentSessions: getRecentSessions(),
        previousSessions: getPreviousSessions(),
        previousMonthsMean: getPreviousMonthsMean(),
    }
});

// Function to get recent sessions
function getRecentSessions() {
    return [{
        label: '23 de Març, 2025',
        study: '75%',
        warmup: '5%',
        rest: '20%',
        total: '01h 23m'
      },
      {
        label: '21 de Març, 2025',
        study: '78%',
        warmup: '6%',
        rest: '16%',
        total: '00h 27m'
      }]
}

// Function to get previous sessions
function getPreviousSessions() {
    return [
      {
        label: '19 de Març, 2025',
        study: '75%',
        warmup: '5%',
        rest: '20%',
        total: '01h 45m'
      },
      {
        label: '17 de Març, 2025',
        study: '80%',
        warmup: '6%',
        rest: '14%',
        total: '00h 28m'
      },
      {
        label: '16 de Març, 2025',
        study: '72%',
        warmup: '8%',
        rest: '20%',
        total: '02h 15m'
      },
      {
        label: '14 de Març, 2025',
        study: '79%',
        warmup: '5%',
        rest: '16%',
        total: '00h 14m'
      },
      {
        label: '12 de Març, 2025',
        study: '82%',
        warmup: '7%',
        rest: '11%',
        total: '00h 24m'
      },
      {
        label: '11 de Març, 2025',
        study: '78%',
        warmup: '6%',
        rest: '16%',
        total: '01h 47m'
      },
      {
        label: '9 de Març, 2025',
        study: '83%',
        warmup: '8%',
        rest: '9%',
        total: '00h 34m'
      }
    ]
}

// Function to get previous months mean
function getPreviousMonthsMean() {
    return [
    {
      label: 'Febrer',
      study: '70%',
      warmup: '6%',
      rest: '24%'
    },
    {
      label: 'Gener',
      study: '72%',
      warmup: '5%',
      rest: '23%'
    },
    {
      label: 'Desembre',
      study: '69%',
      warmup: '8%',
      rest: '23%'
    },
    {
      label: 'Novembre',
      study: '71%',
      warmup: '6%',
      rest: '23%'
    }
    ]
}