import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GridBotComponent } from './grid-bot/grid-bot.component';
import { DcaBotComponent } from './dca-bot/dca-bot.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Trading Bots'
        },
        children: [
            { path: 'dca-bot', data: { title: 'DCA Bot' }, component: DcaBotComponent },
            { path: 'grid-bot', data: { title: 'Grid Bot' }, component: GridBotComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TradingBotRoutingModule { }
