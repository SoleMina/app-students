import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StudentsModule } from './pages/students/students.module';
import { SharedModule } from '../../shared/shared.module';
import { CoursesModule } from './pages/courses/courses.module';
import { TeachersModule } from './pages/teachers/teachers.module';
import { UsersModule } from './pages/users/users.module';
import { EnrollmentsModule } from './pages/enrollments/enrollments.module';

@NgModule({
  declarations: [DashboardComponent, ToolbarComponent, NavbarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    StudentsModule,
    CoursesModule,
    TeachersModule,
    UsersModule,
    EnrollmentsModule,
    SharedModule,
  ],
  exports: [DashboardComponent, ToolbarComponent, NavbarComponent],
})
export class DashboardModule {}
