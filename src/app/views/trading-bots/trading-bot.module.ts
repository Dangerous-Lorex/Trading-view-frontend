import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { GridBotComponent } from "./grid-bot/grid-bot.component";
import { TradingBotRoutingModule } from "./trading-bot-routing.module";
import {
    AvatarModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    FormModule,
    GridModule,
    NavModule,
    ProgressModule,
    TableModule,
    TabsModule
} from '@coreui/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { IconModule } from '@coreui/icons-angular';
import { WidgetsModule } from '../widgets/widgets.module';
import { DcaBotComponent } from "./dca-bot/dca-bot.component";
import { TradingViewChartModule } from 'src/components/trading-view-chart/trading-view-chart.module';

@NgModule({
    declarations: [GridBotComponent, DcaBotComponent],
    imports: [
        TradingBotRoutingModule,
        CardModule,
        NavModule,
        IconModule,
        TabsModule,
        CommonModule,
        GridModule,
        ProgressModule,
        ReactiveFormsModule,
        ButtonModule,
        FormModule,
        ButtonModule,
        ButtonGroupModule,
        ChartjsModule,
        AvatarModule,
        TableModule,
        WidgetsModule,
        TradingViewChartModule
    ],
})
export class TradingBotModule { }
