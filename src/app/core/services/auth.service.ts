import { Injectable } from '@angular/core';
import { LoginPayload } from '../../modules/auth/models';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../../modules/dashboard/pages/users/models';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/auth/auth.action';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { selectAuthUser } from '../../store/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUser$: Observable<User | null>;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store
  ) {
    this.authUser$ = this.store.select(selectAuthUser);
  }

  get isAdmin$(): Observable<boolean> {
    return this.authUser$.pipe(map((user) => user?.role === 'Admin'));
  }

  login(payload: LoginPayload, next?: () => void): void {
    this.httpClient
      .get<User[]>(
        `${environment.baseApiUrl}/users?email=${payload.email}&password=${payload.password}`
      )
      .subscribe({
        next: (usersResult) => {
          if (!usersResult[0]) {
            alert('Email or password invalid');
          } else {
            //If login is successful
            localStorage.setItem('access_token', usersResult[0].accessToken);
            this.store.dispatch(
              AuthActions.setAuthUser({ user: usersResult[0] })
            );
            this.router.navigate(['dashboard/students']);
          }

          if (!!next) {
            next();
          }
        },
        error: (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 0) {
              alert('El servidor está caido');
            }
          }
        },
      });
  }

  isAuthenticated(): Observable<boolean> {
    return this.httpClient
      .get<User[]>(
        `${environment.baseApiUrl}/users?accessToken=${localStorage.getItem(
          'access_token'
        )}`
      )
      .pipe(
        map((res) => {
          const userResult = res[0];
          if (userResult) {
            this.store.dispatch(AuthActions.setAuthUser({ user: userResult }));
          }

          return !!userResult;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.store.dispatch(AuthActions.unsetAuthUser());
    this.router.navigate(['auth', 'login']);
  }
}
