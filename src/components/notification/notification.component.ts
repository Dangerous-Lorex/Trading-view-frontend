// src/app/notification/notification.component.ts
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  template: `
    <div *ngIf="message" class="fixed top-4 right-4 py-3 px-10 rounded-sm shadow-lg text-sm" 
         [ngClass]="type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'">
      {{ message }}
    </div>
  `,
})
export class NotificationComponent implements OnInit {
  @Input() message: string | null = null;
  @Input() type: 'success' | 'error' = 'success';

  ngOnInit() {
    if (this.message) {
      setTimeout(() => {
        this.close();
      }, 3000);
    }
  }

  close() {
    this.message = null;
  }
}