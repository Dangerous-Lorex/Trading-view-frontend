import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'original-value-component',
    templateUrl: './original-value.component.html',
    standalone: true,
    imports: [CommonModule]
})
export class OriginalValueComponent {
}
