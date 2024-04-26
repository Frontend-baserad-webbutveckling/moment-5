// Hämta JSON data med kurser
fetch('https://studenter.miun.se/~mallar/dt211g/')
  .then(response => response.json())
  .then(data => {
    createBarChart(data);
    createPieChart(data);
  });

function createBarChart(data) {

  // Sortera data
  const courses = data
  .filter(item => item.type === 'Kurs')
  .sort((a, b) => b.applicantsTotal - a.applicantsTotal);

  // Hämtar namn på de 6 mest sökta kurserna
  const courseLabels = courses.slice(0, 6).map(course => course.name);
  // Hämtar antal sökande för de 6 mest sökta kurserna
  const courseValues = courses.slice(0, 6).map(course => course.applicantsTotal);

  const chartContainer = document.getElementById('bar-chart-container');
  new Chart(chartContainer, {
    // Typ av diagram (stapeldiagram)
    type: 'bar',
    data: {
      labels: courseLabels,
      datasets: [
        {
          label: 'Totalt antal sökande',
          data: courseValues,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#99FF99', '#C74C70'], // Färger för staplarna
          borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#99FF99', '#C74C70'], // Ramfärger för staplarna
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'De 6 mest sökta kurserna på Mittuniversitetet, HT23'
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function createPieChart(data) {
  // Sortera data
  const programs = data
  .filter(item => item.type === 'Program')
  .sort((a, b) => b.applicantsTotal - a.applicantsTotal);
  const programLabels = programs.slice(0, 5).map(program => program.name);
  const programValues = programs.slice(0, 5).map(program => program.applicantsTotal);
  const chartContainer = document.getElementById('pie-chart-container');
 new Chart(chartContainer, {
    type: 'pie',
    data: {
      labels: programLabels,
      datasets: [
        {
          data: programValues,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#99FF99'],
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'De 5 mest säkta programmen på Mittuniversitetet, HT23'
      }
    }
  });
}
