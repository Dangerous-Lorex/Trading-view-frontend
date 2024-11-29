import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './auto-complete.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [AutocompleteComponent],
  imports: [CommonModule, FormsModule],
  exports: [AutocompleteComponent]
})
export class AutocompleteModule { }
