import { Component } from '@angular/core';
import { NavbarItems } from '../../pages/students/models';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  navItems: NavbarItems[] = [
    {
      name: 'Home',
      link: 'students',
      icon: 'home',
    },
    {
      name: 'Login',
      link: 'login',
      icon: 'person',
    },
    {
      name: 'Users',
      link: 'users',
      icon: 'manage_accounts',
    },
    {
      name: 'Students',
      link: 'students',
      icon: 'group',
    },
    {
      name: 'Register student',
      link: 'students-register',
      icon: 'person_add',
    },
    {
      name: 'Courses',
      link: 'courses',
      icon: 'menu_book',
    },
    {
      name: 'Register course',
      link: 'courses-register',
      icon: 'library_books',
    },
    {
      name: 'Teachers',
      link: 'teachers',
      icon: 'person_3',
    },
    {
      name: 'Register teacher',
      link: 'teachers-register',
      icon: 'group_add',
    },
    {
      name: 'Logout',
      link: 'home',
      icon: 'logout',
    },
  ];

  constructor(private authService: AuthService) {}

  logout(): void {
    // localStorage.removeItem('token');
    // this.router.navigate(['auth', 'login']);

    this.authService.logout();
  }
}
