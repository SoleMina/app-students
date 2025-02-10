import { Component } from '@angular/core';
import { NavbarItems } from '../../pages/students/models';
import { Router } from '@angular/router';

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
      link: 'home',
      icon: 'home',
    },
    {
      name: 'Login',
      link: 'login',
      icon: 'person',
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
      name: 'Logout',
      link: 'home',
      icon: 'logout',
    },
  ];

  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('token');

    this.router.navigate(['auth', 'login']);
  }
}
