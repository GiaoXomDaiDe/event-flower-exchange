// ChartConfig.jsx

export const LineChartSeries = [
  {
    name: 'Total Spent',
    data: [30, 50, 108, 80, 100, 95]
  }
]

export const LineChartOptions = {
  chart: {
    type: 'line',
    toolbar: {
      show: true
    },
    dropShadow: {
      enabled: true,
      top: 10,
      left: 0,
      blur: 5,
      color: '#ff8c9d',
      opacity: 0.3
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 1000,
      animateGradually: {
        enabled: true,
        delay: 150
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350
      }
    }
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  markers: {
    size: 6,
    colors: ['#ff1b3e'],
    strokeColors: '#fff',
    strokeWidth: 2,
    hover: {
      sizeOffset: 4
    }
  },
  xaxis: {
    categories: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
    title: {
      text: 'Month'
    },
    labels: {
      style: {
        colors: '#4B4B4B',
        fontWeight: 'bold'
      }
    }
  },
  yaxis: {
    title: {
      text: 'Value'
    },
    labels: {
      style: {
        colors: '#4B4B4B',
        fontWeight: 'bold'
      }
    }
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (value) {
        return `$${value}`
      }
    }
  },
  colors: ['#ff3a5a'],
  grid: {
    borderColor: '#e7e7e7',
    row: {
      colors: ['#f3f3f3', 'transparent'], // alternating row colors
      opacity: 0.5
    }
  }
}

export const PieChartSeries = [30, 50, 85]

export const PieChartOptions = {
  chart: {
    type: 'pie',
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350
      }
    }
  },
  labels: ['Active Products', 'Out of Stock', 'Pending Approval'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  ],
  legend: {
    position: 'bottom',
    offsetY: 0,
    height: 50
  }
}
