import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
    templateUrl: './dca-bot.component.html',
    styleUrls: ['./dca-bot.component.scss'],
})
export class DcaBotComponent implements OnInit {

    public formBot = new UntypedFormGroup({
        orderType: new UntypedFormControl('Market'),
        signalType: new UntypedFormControl('Manual'),
        orderSide: new UntypedFormControl('Buy')
    });


    public panes = [
        { name: 'Home 01', id: 'tab-01' },
        { name: 'Profile 02', id: 'tab-02' },
    ];

    ngOnInit(): void {
    }


    setOrderType(value: string): void {
        this.formBot.patchValue({ orderType: value });
    }

    setOrderSide(value: string): void {
        this.formBot.patchValue({ orderSide: value });
    }

    setSignalType(value: string): void {
        this.formBot.patchValue({ signalType: value });
    }
}