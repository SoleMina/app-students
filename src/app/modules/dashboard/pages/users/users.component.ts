import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../../../core/services/users.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './models';
import { selectUsers } from './store/user.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserActions } from './store/user.actions';

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
    console.log(this.users$, 'userssss');

    this.dataSource = new MatTableDataSource();

    // Subscribe
    this.users$.subscribe((users) => {
      this.dataSource.data = users;
      console.log(this.dataSource.data, 'this.dataSource.data');
    });
  }
  ngOnDestroy(): void {
    this.userService.resetUserState();
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  deleteUserById(id: string) {
    this.userService.deleteUserById(id);
  }

  displayedColumns: string[] = ['id', 'name', 'email', 'role'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
