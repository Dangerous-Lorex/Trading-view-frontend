import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { GridBotChartsData, IChartProps } from './grid-bot-charts-data';
import { TradingViewChartComponent } from 'src/components/trading-view-chart/trading-view-chart.component';

@Component({
  templateUrl: './grid-bot.component.html',
  styleUrls: ['./grid-bot.component.scss']
})
export class GridBotComponent implements OnInit {
  constructor(private chartsData: GridBotChartsData) {
  }

  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });

  ngOnInit(): void {
    this.initCharts();
  }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }

  public formBot = new UntypedFormGroup({
    orderType: new UntypedFormControl('Market')
  });

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }

  public panes = [
    { name: 'Home 01', id: 'tab-01' },
    { name: 'Profile 02', id: 'tab-02' },
  ];

  setOrderType(value: string): void {
    this.formBot.patchValue({ orderType: value });
  }
}
