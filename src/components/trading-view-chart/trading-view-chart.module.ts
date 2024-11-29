import { NgModule } from '@angular/core';
import { TradingViewChartComponent } from './trading-view-chart.component';
import { CommonModule } from '@angular/common';
import { GridModule, ProgressModule } from '@coreui/angular';

@NgModule({
  declarations: [TradingViewChartComponent],
  exports: [TradingViewChartComponent],
  imports: [CommonModule, GridModule, ProgressModule]
})
export class TradingViewChartModule { }
