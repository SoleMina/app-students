import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './pages/students/students.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { TeachersComponent } from './pages/teachers/teachers.component';

//Route defined dashboard/

const routes: Routes = [
  {
    path: 'students',
    component: StudentsComponent,
    loadChildren: () =>
      import('./pages/students/students.module').then((m) => m.StudentsModule),
  },
  {
    path: 'courses',
    component: CoursesComponent,
    loadChildren: () =>
      import('./pages/courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: 'teachers',
    component: TeachersComponent,
    loadChildren: () =>
      import('./pages/teachers/teachers.module').then((m) => m.TeachersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
