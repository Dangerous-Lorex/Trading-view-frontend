import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SmartTradesComponent } from "./smart-trades/smart-trades.component";
import { TerminalOrdersComponent } from "./terminal-orders/terminal-orders.component";

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Smart Trading'
        },
        children: [
            { path: 'smart-trades', data: { title: 'Smart Trades' }, component: SmartTradesComponent },
            { path: 'terminal-orders', data: { title: 'Terminal Orders' }, component: TerminalOrdersComponent },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SmartTradeRoutingModule { }