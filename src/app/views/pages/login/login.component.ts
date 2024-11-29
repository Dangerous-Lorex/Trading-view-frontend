import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: boolean = false;
  notification: { message?: string; type?: 'success' | 'error' } | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }
  rememberUserData = localStorage.getItem('rememberMe') ? JSON.parse(localStorage.getItem('rememberMe') || '') : null;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [this.rememberUserData?.email || '', [Validators.required, Validators.email]],
      password: [this.rememberUserData?.password || '', Validators.required],
      rememberMe: [this.rememberUserData?.rememberMe || false]
    });
  }

  loginWithGoogle() {
    this.authService.googleSignIn().then(({ idToken, userProfile }) => {
      this.authService.googleSignInBackend(idToken).then((response) => {
        if (response.accessToken) {
          this.router.navigate(['/dashboard']);
        }
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

  get f() {
    return this.loginForm.controls;
  }

  getNotificationType(): 'success' | 'error' {
    return this.notification?.type === 'success' || this.notification?.type === 'error'
      ? this.notification.type
      : 'success';
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.get('rememberMe')?.value === true) {
      localStorage.setItem('rememberMe', JSON.stringify(this.loginForm.value));
    } else {
      localStorage.removeItem('rememberMe');
    }
    this.authService.login(this.loginForm.value).then((res: any) => {
      this.notification = {
        message: res.error ? res.error.message : res.message,
        type: res.status === 200 ? "success" : "error",
      };
      console.log("res", res)
      if (res.status == 200) {
        this.router.navigate(['/dashboard']);
      }

      setTimeout(() => {
        this.notification = {};
      }, 3000);
    });
  }

}
