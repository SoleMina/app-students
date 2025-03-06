import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../../../core/services/users.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './models';
import { selectUsers } from './store/user.selectors';

@Component({
  selector: 'app-users',
  standalone: false,

  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit, OnDestroy {
  users$: Observable<User[]>;
  constructor(private userService: UsersService, private store: Store) {
    this.users$ = this.store.select(selectUsers);
  }
  ngOnDestroy(): void {
    this.userService.resetUserState();
  }

  ngOnInit(): void {
    // this.userService.getUsers().subscribe({
    //   next: (userPagination) => {
    //     console.log(userPagination);
    //   },
    // });
    this.userService.loadUsers();
  }

  deleteUserById(id: string) {
    this.userService.deleteUserById(id);
  }
}
