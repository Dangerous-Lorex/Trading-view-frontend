import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    forgotPasswordForm!: FormGroup;
    submitted = false;
    notification: { message?: string; type?: 'success' | 'error' } | null = null;

    constructor(private fb: FormBuilder, private authService: AuthService) {

    }

    ngOnInit(): void {
        this.forgotPasswordForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    onSubmit() {
        this.submitted = true;
        if (this.forgotPasswordForm.invalid) {
            return;
        }
        this.authService.forgotPassword(this.forgotPasswordForm.value.email).then((res: any) => {
            console.log(res);
            // this.notification = {
            //     message: res.error ? res.error.message : res.message,
            //     type: res.status === 200 ? "success" : "error",
            // };
        });
    }

    getNotificationType(): 'success' | 'error' {
        return this.notification?.type === 'success' || this.notification?.type === 'error'
            ? this.notification.type
            : 'success';
    }
}
