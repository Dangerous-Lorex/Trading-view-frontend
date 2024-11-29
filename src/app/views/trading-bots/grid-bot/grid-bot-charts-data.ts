import { Injectable } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/utils';

export interface IChartProps {
  data?: any;
  labels?: any;
  options?: any;
  colors?: any;
  type?: any;
  legend?: any;

  [propName: string]: any;
}

@Injectable({
  providedIn: 'any'
})
export class GridBotChartsData {
  constructor() {
    this.initMainChart();
  }

  public mainChart: IChartProps = {};

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  initMainChart(period: string = 'Month') {
    const brandSuccess = getStyle('--cui-success') ?? '#4dbd74';
    const brandInfo = getStyle('--cui-info') ?? '#20a8d8';
    const brandInfoBg = hexToRgba(brandInfo, 10);
    const brandDanger = getStyle('--cui-danger') || '#f86c6b';

    // mainChart
    // mainChart
    this.mainChart['elements'] = period === 'Month' ? 12 : 27;
    this.mainChart['Data1'] = [];
    this.mainChart['Data2'] = [];
    this.mainChart['Data3'] = [];

    // generate random values for mainChart
    // for (let i = 0; i <= this.mainChart['elements']; i++) {
    //   this.mainChart['Data1'].push(this.random(100, 240));
    //   this.mainChart['Data2'].push(this.random(20, 80));
    //   this.mainChart['Data3'].push(65);
    // }

    const data1: number[] = [];
    const data2: number[] = [];
    const data3: number[] = [];
    for (let i = 0; i <= this.mainChart['elements']; i++) {
      data1.push(this.random(100, 240));
      data2.push(this.random(20, 80));
      // while(true) {
      //   const value = this.random(10, 240);
      //   if (value < data1[i]) {
      //     data2.push(value);
      //     break;
      //   }
      // }
      while (true) {
        const value = this.random(20, 240);
        if (value < data1[i] && value > data2[i]) {
          data3.push(value);
          break;
        }
      }
    }

    const maxData1 = Math.max(...data1) + 10;
    const maxData2 = Math.max(...data2) + 10;
    for (let i = 0; i <= this.mainChart['elements']; i++) {
      this.mainChart['Data1'].push(data1[i] / maxData1 * 100);
      this.mainChart['Data2'].push(-(data2[i] / maxData2 * 100));
      this.mainChart['Data3'].push(200 * (data3[i] - data2[i]) / (data1[i] - data2[i]) - 100);
    }


    let labels: string[] = [];
    if (period === 'Month') {
      labels = new Array(this.mainChart['elements']).fill('');
    } else {
      labels = new Array(this.mainChart['elements']).fill('');
    }

    const colors = [
      {
        backgroundColor: brandInfoBg,
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        fill: true,
        stepped: true,
        pointRadius: 4,
        order: 3
      },
      {
        backgroundColor: 'transparent',
        borderColor: brandSuccess || '#4dbd74',
        pointHoverBackgroundColor: brandSuccess || '#4dbd74',
        stepped: true,
        pointRadius: 4,
        order: 2
      },
      {
        backgroundColor: 'transparent',
        borderColor: brandDanger || '#f86c6b',
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 3,
        stepped: true,
        pointRadius: 4,
        order: 1
      }
    ];

    const datasets = [
      {
        data: this.mainChart['Data1'],
        label: 'Max',
        ...colors[0]
      },
      {
        data: this.mainChart['Data2'],
        label: 'Min',
        ...colors[1]
      },
      {
        data: this.mainChart['Data3'],
        label: 'Current',
        ...colors[2]
      }
    ];

    const plugins = {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        position: 'nearest',
        callbacks: {
          label: (context: any) => {
            const index = context.dataIndex;
            if (context.dataset.label === 'Max') {
              return `Max: $${data1[index]}`;
            } else if (context.dataset.label === 'Min') {
              return `Min: $${data2[index]}`;
            } else {
              return `Current: $${data3[index]}`;
            }
          },
          labelColor: (context: any) => {
            return {
              backgroundColor: context.dataset.borderColor
            };
          }
        },
      }
    };

    const options = {
      maintainAspectRatio: false,
      plugins,
      scales: {
        x: {
          grid: {
            drawOnChartArea: true
          }
        },
        y: {
          beginAtZero: true,
          max: 100,
          min: -100,
          ticks: {
            stepSize: 10,
            callback: (value: any) => `${value}%`
          },
          grid: {
            drawOnChartArea: true
          }
        }
      },
      elements: {
        line: {
          tension: 0.4
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    };

    this.mainChart.type = 'line';
    this.mainChart.options = options;
    this.mainChart.data = {
      datasets,
      labels
    };
  }

}
