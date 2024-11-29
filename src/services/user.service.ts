import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

declare const gapi: any;

@Injectable({
    providedIn: 'root'
})
export class UserService implements OnInit {

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit(): void {
    }

    async getUserList (): Promise<any> {
        return await this.http.get(`${environment.apiUrl}/user/user-list`)
        .toPromise()
        .then((res: any) => {
            return res
        })
        .catch((err: any) => {
            return err
        })
    }
}
