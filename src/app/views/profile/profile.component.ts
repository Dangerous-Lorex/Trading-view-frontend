import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';

import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import { IconModule } from '@coreui/icons-angular';
import { AutocompleteModule } from '../../../components/auto-complete/auto-complete.module';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, CardModule, FormModule, GridModule, IconModule, AutocompleteModule]
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  userData: any = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : {}

  submitted: boolean = false

  organization: any[] = []
  constructor(private fb: FormBuilder, private authService: AuthService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log(this.userData.organization)
    this.profileForm = this.fb.group({
      username: [this.userData.username, Validators.required],
      email: [this.userData.email, [Validators.required, Validators.email]],
      password: [this.userData.password, Validators.required],
      confirmPassword: [this.userData.rePassword, Validators.required],
      organization: [this.userData.organization, Validators.required],
      isAdmin: [this.userData.isAdmin],
    })
    this.getOrganization();
    this.cdr.detectChanges();
  }

  onCombinedValueChanged(combinedValue: string) {
    if (combinedValue.split(' - ').length > 1) {
      this.profileForm.get('organization')?.setValue(combinedValue.split(' - ')[1]);
    } else {
      this.profileForm.get('organization')?.setValue(combinedValue);
    }
  }

  getOrganization(): void {
    this.authService.getOrganization().then((response) => {
      response.map((item: any) => this.organization.push(item.title));
    });
  }

}
