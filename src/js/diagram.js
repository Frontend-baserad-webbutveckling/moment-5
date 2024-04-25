// Load the courses.json file using ES6 syntax
fetch('https://studenter.miun.se/~mallar/dt211g/')
  .then(response => response.json())
  .then(data => {
    createChart(data);
  });
  data.sort((a, b) => b.applicantsTotal - a.applicantsTotal);



  function createChart(data) {
    // Hämtar namn på de 6 mest sökta kurserna
    const labels = data.slice(0, 6).map(course => course.name); 
    // Hämtar antal sökande för de 6 mest sökta kurserna
    const values = data.slice(0, 6).map(course => course.applicantsTotal); 
  
    const chartContainer = document.getElementById('chart-container');
    const chart = new Chart(chartContainer, {
        // Typ av diagram (stapeldiagram)
      type: 'bar', 
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Totalt antal sökande',
            data: values,
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
  