import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'section-component',
    templateUrl: './section.component.html',
    standalone: true,
    imports: [CommonModule],
})
export class SectionComponent {

    isPluginSeleted = ""
    selectPlugin(plugin: string) {
        this.isPluginSeleted = plugin
    }
}
