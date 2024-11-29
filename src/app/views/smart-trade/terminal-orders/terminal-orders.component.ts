import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ButtonModule, ButtonGroupModule, NavModule, TabsModule, GridModule } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TradingViewChartModule } from 'src/components/trading-view-chart/trading-view-chart.module';

@Component({
  selector: 'app-terminal-orders',
  templateUrl: './terminal-orders.component.html',
  styleUrls: ['./terminal-orders.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, ButtonGroupModule, NavModule, TabsModule, CommonModule, RouterModule, GridModule, TradingViewChartModule]
})
export class TerminalOrdersComponent {

  public formTerminalTrade = new UntypedFormGroup({
    orderType: new UntypedFormControl('Market'),
    sizeBalance: new UntypedFormControl('100')
  });

  setOrderType(value: string): void {
    this.formTerminalTrade.patchValue({ orderType: value });
  }

  setSizeBalance(value: string): void {
    this.formTerminalTrade.patchValue({ sizeBalance: value });
  }
}
