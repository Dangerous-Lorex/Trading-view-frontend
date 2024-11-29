import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavModule, TabsModule, ButtonGroupModule, ButtonModule, GridModule, FormModule, ProgressModule } from '@coreui/angular';
import { RouterModule } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { TradingViewChartModule } from 'src/components/trading-view-chart/trading-view-chart.module';
import { SmartTradesChartsData, IChartProps } from './smart-trades-chart-data';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { SectionComponent } from 'src/components/Plugins/Section/section.component';
import { OriginalValueComponent } from 'src/components/Plugins/original-value/original-value.component';

@Component({
  selector: 'app-smart-trades',
  templateUrl: './smart-trades.component.html',
  styleUrls: ['./smart-trades.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NavModule,
    TabsModule,
    ButtonGroupModule,
    RouterModule,
    ButtonModule,
    ReactiveFormsModule,
    GridModule,
    TradingViewChartModule,
    FormModule,
    ChartjsModule,
    ProgressModule,
    SectionComponent,
    OriginalValueComponent
  ],
})
export class SmartTradesComponent implements OnInit {

  constructor(private chartsData: SmartTradesChartsData) {}
  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];

  ngOnInit(): void {
    this.initCharts();
  }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }



  public formBuy = new UntypedFormGroup({
    orderBuyType: new UntypedFormControl('Market'),
    sizeBuyBalance: new UntypedFormControl("100")
  });
  public formSell = new UntypedFormGroup({
    orderSellType: new UntypedFormControl('Market'),
    sizeSellBalance: new UntypedFormControl("100")
  });
  setBuyOrderType(value: string): void {
    this.formBuy.patchValue({ orderBuyType: value });
  }
  setBuySizeBalance(value: string): void {
    this.formBuy.patchValue({ sizeBuyBalance: value });
  }
  setSellOrderType(value: string): void {
    this.formSell.patchValue({ orderSellType: value });
  }
  setSellSizeBalance(value: string): void {
    this.formSell.patchValue({ sizeSellBalance: value });
  }
}
