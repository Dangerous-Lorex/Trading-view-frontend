import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

import { loadGapiInsideDOM } from 'gapi-script';
declare const gapi: any;

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit {
    public _userData = new BehaviorSubject<any>(null);
    private clientId = environment.googleClientId;

    isAuthenticated: boolean = false;

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit(): void {
    }


    async register(data: any): Promise<any> {
        return await this.http.post<any>(`${environment.apiUrl}/auth/signup`, data)
            .toPromise()
            .then((res: any) => {
                return res;
            }).catch((err: any) => {
                return err;
            });
    }

    async login(data: any): Promise<any> {
        return await this.http.post<any>(`${environment.apiUrl}/auth/signin`, data)
            .toPromise()
            .then((res: any) => {
                this.isAuthenticated = true;
                localStorage.setItem('token', JSON.stringify({ ...res }));
                this._userData.next(res);
                if (res.accessToken) {
                    this.router.navigate(['/dashboard']);
                }
                return res;
            }).catch((err: any) => {
                return err;
            });
    }

    async initGoogleAuth(): Promise<any> {
        const gapi = await loadGapiInsideDOM();
        return new Promise((resolve, reject) => {
            gapi.load('auth2', () => {
                const auth2 = gapi.auth2.init({
                    client_id: this.clientId,
                    scope: 'profile email',
                    redirect_uri: environment.redirectUri, // Set redirect URI
                });
                resolve(auth2);
            });
        });
    }

    async googleSignIn(): Promise<{ idToken: string; userProfile: any }> {
        const auth2 = await this.initGoogleAuth();
        return auth2.signIn().then((user: any) => {
            const profile = user.getBasicProfile();
            return {
                idToken: user.getAuthResponse().id_token,
                userProfile: {
                    id: profile.getId(),
                    name: profile.getName(),
                    email: profile.getEmail(),
                    image: profile.getImageUrl(),
                },
            };
        });
    }

    async googleSignInBackend(idToken: string): Promise<any> {
        return await fetch(`${environment.apiUrl}/auth/googleSignin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: idToken }),
        })
            .then((response) => response.json())
            .then((data) => {
                this.isAuthenticated = true;
                localStorage.setItem('token', JSON.stringify({ ...data }));
                this._userData.next(data);
                return data;
            })
            .catch((error) => console.error('Error:', error));
    }

    async signUpWithGoogle(idToken: string): Promise<any> {
        return await fetch(`${environment.apiUrl}/auth/googleSignup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: idToken }),
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => console.error('Error:', error));
    }

    async forgotPassword(email: string): Promise<any> {
        return await this.http.post<any>(`${environment.apiUrl}/auth/forgot-password`, { email })
            .toPromise()
            .then((res: any) => {
                return res;
            });
    }

    async getOrganization(): Promise<any> {
        return await this.http.get<any>(`${environment.apiUrl}/getOrganizations`)
            .toPromise()
            .then((res: any) => {
                return res;
            });
    }

    logout(): void {
        (window as any).google.accounts.id.disableAutoSelect();
        localStorage.removeItem('token');
    }

    isLoggedIn(): boolean {
        return this.isAuthenticated;
    }
}
