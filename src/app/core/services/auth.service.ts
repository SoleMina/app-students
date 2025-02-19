import { Injectable } from '@angular/core';
import { LoginPayload } from '../../modules/auth/models';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../../modules/dashboard/pages/users/models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  users: User[] = [
    {
      id: '001',
      name: 'Karina',
      email: 'karina.pradogutierrez@gmail.com',
      password: '0123456',
      accessToken: 'kgfMkfkdl03940djgde',
      role: 'Admin',
    },
    {
      id: '002',
      name: 'Admin',
      email: 'admin@gmail.com',
      password: '0123456',
      accessToken: 'kgfMdgggl03940djgde',
      role: 'Admin',
    },
    {
      id: '003',
      name: 'Employee',
      email: 'employee@gmail.com',
      password: '0123456',
      accessToken: 'kgfMkfkdl03940dkdmg',
      role: 'Employee',
    },
  ];

  private _authUser$ = new BehaviorSubject<User | null>(null);

  authUser$ = this._authUser$.asObservable();

  get isAdmin$(): Observable<boolean> {
    return this.authUser$.pipe(map((user) => user?.role === 'Admin'));
  }

  login(payload: LoginPayload): void {
    // this.authUser$.subscribe((user) => {});

    const loginResult = this.users.find(
      (user) =>
        user.email === payload.email && user.password === payload.password
    );
    if (!loginResult) {
      alert('Email or password invalid');
      return;
    }

    console.log(loginResult, 'loginResult');
    localStorage.setItem('access_token', loginResult.accessToken);
    this._authUser$.next(loginResult);
    this.router.navigate(['dashboard/students']);
  }

  isAuthenticated(): Observable<boolean> {
    //if authService is null then return false
    //if authService !== null then return true
    //return this.authUser$.pipe(map((user) => (!!user ? true : false)));

    const storageUser = this.users.find(
      (user) => user.accessToken === localStorage.getItem('access_token')
    );
    this._authUser$.next(storageUser || null);
    return this.authUser$.pipe(map((user) => !!user));
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this._authUser$.next(null);
    this.router.navigate(['auth', 'login']);
  }
}
