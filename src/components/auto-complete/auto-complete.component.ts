import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-autocomplete',
    template: `
        <div class="relative w-full">
            <input
                type="text"
                [(ngModel)]="searchTerm"
                (input)="onInput()"
                (keydown)="onKeyDown($event)"
                class="w-full py-[0.375rem] px-[0.75rem] border rounded-tr-lg rounded-br-lg text-md focus:outline-none focus:ring focus:ring-blue-300 text-[1rem]"
                placeholder="Organization"
                [attr.aria-expanded]="isOpen"
                (focus)="openDropdown()"
                (blur)="closeDropdown()"
            />

            <ul
                *ngIf="isOpen && filteredOptions.length > 0"
                class="absolute z-10 w-full bg-white border rounded-lg shadow-md mt-2 max-h-60 overflow-auto"
            >
                <li
                    *ngFor="let option of filteredOptions; let i = index"
                    (click)="selectOption(option)"
                    [class.bg-blue-100]="i === activeIndex"
                    class="px-4 py-2 cursor-pointer hover:bg-blue-200"
                >
                    {{ option }}
                </li>
            </ul>
        </div>

    `
})
export class AutocompleteComponent {
    @Input() options: string[] = [];
    @Output() combinedValueChanged = new EventEmitter<string>();
    searchTerm: string = '';
    filteredOptions: string[] = [];
    selectedValue: string | null = null;
    isOpen = false;
    activeIndex = -1;

    filterOptions() {
        this.filteredOptions = this.options.filter(option =>
            option.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        this.isOpen = this.filteredOptions.length > 0;
        this.emitCombinedValue();
    }


    emitCombinedValue() {
        const combinedValue = `${this.searchTerm}${this.selectedValue ? ' - ' + this.selectedValue : ''}`;
        this.combinedValueChanged.emit(combinedValue);
    }
    openDropdown() {
        this.isOpen = true;
    }

    closeDropdown() {
        setTimeout(() => {
            this.isOpen = false;
            this.activeIndex = -1;
        }, 150); // Delay to handle click selection before blur
    }

    selectOption(option: string) {
        this.searchTerm = option;
        this.selectedValue = option; // Update the selected value
        this.filteredOptions = [];
        this.isOpen = false;
        this.emitCombinedValue(); // Emit the combined value
    }

    onInput() {
        this.selectedValue = null; // Clear selected value if typing
        this.filterOptions();
    }

    onKeyDown(event: any) {
        if (!this.isOpen || this.filteredOptions.length === 0) return;

        if (event.key === 'ArrowDown') {
            this.activeIndex = (this.activeIndex + 1) % this.filteredOptions.length;
        } else if (event.key === 'ArrowUp') {
            this.activeIndex =
                (this.activeIndex - 1 + this.filteredOptions.length) % this.filteredOptions.length;
        } else if (event.key === 'Enter' && this.activeIndex >= 0) {
            this.selectOption(this.filteredOptions[this.activeIndex]);
        }
    }
}
