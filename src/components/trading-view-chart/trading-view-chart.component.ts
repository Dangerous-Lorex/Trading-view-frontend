import { Component, OnInit, AfterViewInit } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
    selector: 'app-trading-view-chart',
    templateUrl: './trading-view-chart.component.html',
    styleUrls: ['./trading-view-chart.component.scss']
})
export class TradingViewChartComponent implements OnInit, AfterViewInit {

    constructor() {}

    ngOnInit(): void {
      // Any initialization logic
    }
  
    ngAfterViewInit(): void {
      // Initialize charts after view is loaded
      this.initCharts();
    }
  
    // Function to initialize the charts
    initCharts(): void {
      const data = this.generateDayWiseTimeSeries(new Date("22 Apr 2017").getTime(), 115, {
        min: 30,
        max: 90
      });
  
      // Chart 1: Area Chart
      const options1 = {
        chart: {
          id: "chart2",
          type: "area",
          height: 230,
          foreColor: "#ccc",
          toolbar: {
            autoSelected: "pan",
            show: true
          }
        },
        colors: ["#00BAEC"],
        stroke: {
          width: 3
        },
        grid: {
          borderColor: "#555",
          clipMarkers: false,
          yaxis: {
            lines: {
              show: true
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          gradient: {
            enabled: true,
            opacityFrom: 0.55,
            opacityTo: 0
          }
        },
        series: [
          {
            data: data
          }
        ],
        tooltip: {
          theme: "dark"
        },
        xaxis: {
          type: "datetime"
        },
        yaxis: {
          min: 0,
          tickAmount: 4
        }
      };
  
      const chart1 = new ApexCharts(document.querySelector("#chart-area"), options1);
      chart1.render();
  
      // Chart 2: Bar Chart
      const options2 = {
        chart: {
          id: "chart1",
          height: 130,
          type: "bar",
          foreColor: "#ccc",
          brush: {
            target: "chart2",
            enabled: true
          },
          selection: {
            enabled: true,
            fill: {
              color: "#fff",
              opacity: 0.4
            },
            xaxis: {
              min: new Date("27 Jul 2017 10:00:00").getTime(),
              max: new Date("14 Aug 2017 10:00:00").getTime()
            }
          }
        },
        colors: ["#FF0080"],
        series: [
          {
            data: data
          }
        ],
        stroke: {
          width: 2
        },
        grid: {
          borderColor: "#444"
        },
        markers: {
          size: 0
        },
        xaxis: {
          type: "datetime",
          tooltip: {
            enabled: false
          }
        },
        yaxis: {
          tickAmount: 2
        }
      };
  
      const chart2 = new ApexCharts(document.querySelector("#chart-bar"), options2);
      chart2.render();
    }
  
    // Function to generate random time series data
    generateDayWiseTimeSeries(baseval: number, count: number, yrange: { min: number, max: number }) {
      let i = 0;
      const series = [];
      while (i < count) {
        const x = baseval;
        const y =
          Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
  
        series.push([x, y]);
        baseval += 86400000;  // Adding one day in milliseconds
        i++;
      }
      return series;
    }
}