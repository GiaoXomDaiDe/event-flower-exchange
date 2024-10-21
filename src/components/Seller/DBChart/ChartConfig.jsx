export const LineChartSeries = [
  {
    name: 'Total Sales (in USD)',
    data: [350, 530, 420, 610, 220, 840, 230, 1150]
  }
]

export const LineChartOptions = {
  chart: {
    events: {
      animationEnd: (chart) => {
        chart.windowResizeHandler()
      }
    },
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
    categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
    title: {
      text: 'Month'
    },
    labels: {
      style: {
        colors: '#4B4B4B',
        fontWeight: 'bold',
        fontFamily: 'Beausite Classic Trial'
      }
    }
  },
  yaxis: {
    title: {
      text: 'Total Sales (USD)',
      style: {
        fontFamily: 'Beausite Classic Trial'
      }
    },
    labels: {
      style: {
        colors: '#4B4B4B',
        fontWeight: 'bold',
        fontFamily: 'Beausite Classic Trial'
      }
    }
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (value) {
        return `$${value.toLocaleString()}`
      }
    },
    onDatasetHover: {
      highlightDataSeries: true
    },
    marker: {
      show: true
    }
  },
  grid: {
    show: true,
    borderColor: '#e7e7e7',
    row: {
      colors: ['#f3f3f3', 'transparent'],
      opacity: 0.5
    }
  },
  colors: ['#ff3a5a']
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
  legend: {
    position: 'bottom',
    fontSize: '16px',
    fontFamily: 'Beausite Classic Trial',
    fontWeight: 'bold'
  }
}
