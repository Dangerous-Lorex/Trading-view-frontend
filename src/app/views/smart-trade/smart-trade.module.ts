import { NgModule } from '@angular/core';
import { SmartTradesComponent } from './smart-trades/smart-trades.component';
import { CommonModule } from '@angular/common';
import { TradingViewChartComponent } from '../../../components/trading-view-chart/trading-view-chart.component';

import { NavModule, TabsModule, ButtonGroupModule, ButtonModule, GridModule } from '@coreui/angular';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [SmartTradesComponent],
    imports: [CommonModule, TradingViewChartComponent, NavModule, TabsModule, ButtonGroupModule, ButtonModule, GridModule, RouterModule, ReactiveFormsModule]
})
export class SmartTradeModule { }