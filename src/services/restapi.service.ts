import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject, Subject, timer } from 'rxjs';
import { tap, catchError, switchMap, takeUntil } from 'rxjs/operators';
import { ICategoryModel } from '../app/models/ICategoryModel';
import { IUserModel } from '../app/models/IUserModel';
import { Framework } from '../base/framework';
import { demoCategories as demoCategories } from '../app/models/Category-demo-data';
import { environment } from '../environments/environment';

export interface LoginRequest {
  username: string;  // Changed to camelCase to follow JavaScript naming conventions
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  private apiUrl = environment.apiUrl;
  private categoriesSubject = new BehaviorSubject<ICategoryModel[]>([]);
  private updateInterval$ = timer(0, 10000);
  private stopUpdate$ = new Subject<void>();

  constructor(private http: HttpClient, private framework: Framework) {
    // Use arrow function to avoid losing context of 'this'
    this.updateInterval$.pipe(
      switchMap(() => this.fetchCategories()),
      takeUntil(timer(300 * 60 * 1000)) // Use clearer time units calculation
    ).subscribe();
  }

  login(loginRequest: LoginRequest): Observable<IUserModel> {
    const loginUrl = `${this.apiUrl}/user/login`;
    return this.http.post<IUserModel>(loginUrl, loginRequest).pipe(
      catchError(error => {
        console.error('Login failed:', error);
        return throwError('Login failed due to server error');
      })
    );
  }

  getUsers(): Observable<IUserModel[]> {
    return this.framework.IsDebugging ?
      of([
        { Id: "1", Name: 'Olav', AvatarUrl: 'url1', Role: 'admin' },
        { Id: "2", Name: 'Hans', AvatarUrl: 'url2', Role: 'user' },
        { Id: "3", Name: 'Anna', AvatarUrl: 'url3', Role: 'user' }
      ]) :
      this.http.get<IUserModel[]>(`${this.apiUrl}/users`);
  }

  getCurrentUser(): Observable<IUserModel | undefined> {
    return this.framework.IsDebugging ?
      of({ Id: "1", Name: 'Olav', AvatarUrl: 'url1', Role: 'admin' }) :
      of(undefined);
  }

  getAllCategories(): Observable<ICategoryModel[]> {
    return this.categoriesSubject.asObservable();
  }

  getCategoryInfo(categoryId: string): Observable<ICategoryModel> {
    if (this.framework.IsDebugging) {
      const category = demoCategories.find(repo => repo.Id === categoryId);
      return category ? of(category) : throwError('Category not found');
    }

    return this.http.get<ICategoryModel>(`${this.apiUrl}/categories/${categoryId}`);
  }

  private fetchCategories(): Observable<ICategoryModel[]> {
    return this.http.get<ICategoryModel[]>(`${this.apiUrl}/categories`).pipe(
      tap(categories => this.categoriesSubject.next(categories)),
      catchError(error => {
        console.error('Error fetching categories:', error);
        return throwError('Failed to fetch categories');
      })
    );
  }

  ngOnDestroy() {
    this.stopUpdate$.next();
    this.stopUpdate$.complete();
  }
}
