new Vue({
  el: '#app',
  data: {
    chart: null,
    chartData: {
      labels: getLast7Days(),
      datasets: [{
        label: '',
        data: getStudyMinutes7Days(),
        backgroundColor: '#72C5FF'
      }]
    }
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = document.getElementById('barChart').getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: this.chartData,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: false
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
  return [45, 32, 73, 0, 23, 50, 41];
}