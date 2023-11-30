var lineChartData = {
    labels: [],
    datasets: [{
        label: 'Word count',
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgb(255, 99, 132)',
        lineTension: 0,
        fill: false,
        data: [],
        yAxisID: 'y-axis-1',
    }, {
        label: 'Sources in literatur.bib',
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgb(54, 162, 235)',
        lineTension: 0,
        fill: false,
        data: [],
        yAxisID: 'y-axis-2'
    }, {
        label: 'Used sources',
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgb(75, 192, 192)',
        lineTension: 0,
        fill: false,
        data: [],
        yAxisID: 'y-axis-2'
    },
       {
		label: 'Total pages',
		borderColor: 'rgb(255,140,0)',
		backgroundColor: 'rgb(255,140,0)',
		lineTension: 0,
		fill: false,
		data: [],
		yAxisID: 'y-axis-2'
       },
       {
		label: 'Content pages',
		borderColor: 'rgb(209, 2, 232)',
		backgroundColor: 'rgb(209, 2, 232)',
		lineTension: 0,
		fill: false,
		data: [],
		yAxisID: 'y-axis-2'
       }]
};


var client = new XMLHttpRequest();
client.open('GET', 'data/stats.csv');
client.onreadystatechange = function () {
   // console.log(client.responseText);
    if (client.responseText != "") {
        var rows = client.responseText.split(/\r?\n/);
        var lables = [];
        var pages = [];
        var words = [];
        var totalSources = [];
        var usedSources = [];
        var contentPages = [];
        for (var i = 0; i < rows.length; i++) {
            var points = rows[i].split(" , ");
            if (points.length == 8) {
				if(pages.length == 0 || pages[pages.length-1] != points[3] || words[words.length-1] != points[4]
				|| totalSources[totalSources.length-1] != points[5] || usedSources[usedSources.length-1] != points[6]
                || contentPages[contentPages.length-1] != points[7]){
					lables.push(new Date(points[1] * 1000));
					pages.push(points[3]);
					words.push(points[4]);
					totalSources.push(points[5]);
					usedSources.push(points[6]);
                    contentPages.push(points[7]);
				}
            }
        }
        lineChartData.labels = lables;
        lineChartData.datasets[0].data = words;
        lineChartData.datasets[1].data = totalSources;
        lineChartData.datasets[2].data = usedSources;
        lineChartData.datasets[3].data = pages;
        lineChartData.datasets[4].data = contentPages;
        displayGraph();
    }
}
client.send();

function displayGraph() {
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = Chart.Line(ctx, {
        data: lineChartData,
        options: {
            responsive: true,
            hoverMode: 'index',
            stacked: false,
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'index',
                intersect: false
            },
            title: {
                display: true,
                text: 'Masterarbeit Statistiken',
                fontSize: 32
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                }],
                yAxes: [{
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    ticks: {
                        beginAtZero: true,
                        precision: 0,
                        fontColor: 'rgb(255, 99, 132)'
                    },
                    scaleLabel: {
                        display: true,
                        labelString: '# of Words',
                        fontSize: 20,
                        fontStyle: "bold",
                        fontColor: 'rgb(255, 99, 132)'
                    }
                }, {
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    ticks: {
                        beginAtZero: true,
                        precision: 0
                    },
                    scaleLabel: {
                        display: true,
                        labelString: '# of Sources / Pages',
                        fontSize: 20,
                        fontStyle: "bold"
                    },

                    // grid line settings
                    gridLines: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                }],
            }
        }
    });
}
