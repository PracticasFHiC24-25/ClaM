new Vue({
    el: '#app',
    data: {
        // Charts from current and previous weeks
        weekProgress: getPreviousWeeklyProgress(),
        // Data for the last line chart, the weekly goals progress
        weekProgressGoals: getWeeklyProgressGoals()
    }
});

// Function to get the previous weekly progress (week charts)
function getPreviousWeeklyProgress() {
    return [
        // The first week must be the current one, so it is the same as in statistics.js
        getCurrentWeeklyProgress(),
        // We generate the remaining ones
        { Dl: 42, Dt: 85, Dc: 13, Dj: 76, Dv: 59, Ds: 95, Dg: 24 },
        { Dl: 67, Dt: 12, Dc: 78, Dj: 33, Dv: 90, Ds: 41, Dg: 58 },
        { Dl: 89, Dt: 45, Dc: 22, Dj: 64, Dv: 77, Ds: 30, Dg: 91 },
        { Dl: 38, Dt: 59, Dc: 73, Dj: 26, Dv: 80, Ds: 60, Dg: 99 },
        { Dl: 14, Dt: 93, Dc: 35, Dj: 48, Dv: 62, Ds: 84, Dg: 19 },
        { Dl: 70, Dt: 28, Dc: 51, Dj: 95, Dv: 46, Ds: 73, Dg: 31 },
        { Dl: 56, Dt: 17, Dc: 88, Dj: 20, Dv: 69, Ds: 36, Dg: 74 }
    ]
}

// Function to get the current week progress (week charts), is the same as in statistics.js
function getCurrentWeeklyProgress() {
  const days = ['Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds', 'Dg'];
  const today = (new Date().getDay() + 6) % 7; // 0 (Mon) to 6 (Sun), adjusted because Americans start the week on Sunday
  const fullData = {
      'Dl': 100,
      'Dt': 80,
      'Dc': 60,
      'Dj': 100,
      'Dv': 90,
      'Ds': 70,
      'Dg': 50
  };

  // Construct an object with progress for each day
  const progress = {};
  days.forEach((day, index) => {
      const percent = fullData[day];
      // Check if the day is before or equal to today
      const isPastOrToday = index % 7 <= today;
      progress[day] = isPastOrToday ? percent : 0;
  });

  return progress;
}

// Function to return the weekly progress goals (line)
function getWeeklyProgressGoals() {
    return [45, 67, 89, 38, 14, 70, 56, 90];
}