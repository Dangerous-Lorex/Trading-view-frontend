import { Directive, Input, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  combinedValue: string = '';


  registerForm!: FormGroup;
  submitted: boolean = false;
  notification: { message?: string; type?: 'success' | 'error' } | null = null;
  organization: any[] = [];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      isAdmin: [false],
      organization: ['', Validators.required]
    });
    this.getOrganization();
  }


  onCombinedValueChanged(combinedValue: string) {
    if (combinedValue.split(' - ').length > 1) {
      this.registerForm.get('organization')?.setValue(combinedValue.split(' - ')[1]);
    } else {
      this.registerForm.get('organization')?.setValue(combinedValue);
    }
  }

  getNotificationType(): 'success' | 'error' {
    return this.notification?.type === 'success' || this.notification?.type === 'error'
      ? this.notification.type
      : 'success';
  }

  get f() {
    return this.registerForm.controls;
  }

  signUpWithGoogle() {
    this.authService.googleSignIn().then(({ idToken, userProfile }) => {
      this.authService.signUpWithGoogle(idToken).then((response) => {
        this.notification = {
          message: response.error ? response.error.message : response.message,
          type: response.status === 200 ? "success" : "error",
        };
        setTimeout(() => {
          this.notification = {};
        }, 3000);


      });
    });
  }

  getOrganization(): void {
    this.authService.getOrganization().then((response) => {
      response.map((item: any) => this.organization.push(item.title));
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.notification = {
        message: "Passwords do not match",
        type: "error",
      };
      setTimeout(() => {
        this.notification = {};
      }, 3000);
      return;
    }
    this.authService.register(this.registerForm.value).then((res: any) => {
      this.notification = {
        message: res.error ? res.error.message : res.message,
        type: res.status === 200 ? "success" : "error",
      };
      if (res.status == 200) {
        this.registerForm.reset();
        this.router.navigate(['/'])
      }
      setTimeout(() => {
        this.notification = {};
      }, 3000);
    }).catch((err: any) => {
      this.notification = {
        message: err.message,
        type: "error",
      };
      setTimeout(() => {
        this.notification = {};
      }, 3000);
    });
  }
}
