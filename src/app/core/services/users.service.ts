import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { UserActions } from '../../modules/dashboard/pages/users/store/user.actions';
import { User } from '../../modules/dashboard/pages/users/models';
import { environment } from '../../../environments/environment.development';

export interface UsersPagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ReqResUser[];
  support: Support;
}

export interface ReqResUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface Support {
  url: string;
  text: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private httpClient: HttpClient, private store: Store) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.baseApiUrl}/users`);
  }

  // getUsers(): void {
  //   this.store.dispatch(UserActions.loadUsers());
  // }

  deleteUserById(id: string) {
    this.store.dispatch(UserActions.deleteUserById({ id }));
  }

  resetUserState(): void {
    this.store.dispatch(UserActions.resetState());
  }
}
