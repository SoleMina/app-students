import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersComponent } from './teachers.component';
import { TeacherFormComponent } from './components/teacher-form/teacher-form.component';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';

const routes: Routes = [
  {
    path: '',
    component: TeachersComponent,
    pathMatch: 'full',
  },
  {
    path: 'teachers/:id',
    component: TeacherDetailsComponent,
  },
  {
    path: 'teachers-register',
    component: TeacherFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeachersRoutingModule {}
