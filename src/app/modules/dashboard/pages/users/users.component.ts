import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../core/services/users.service';

@Component({
  selector: 'app-users',
  standalone: false,

  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (userPagination) => {
        console.log(userPagination);
      },
    });
  }
}
