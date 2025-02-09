import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentFormComponent } from './components/student-form/student-form.component';

//Route is dashboard/students

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
    pathMatch: 'full',
  },
  {
    path: 'students/:id',
    component: StudentDetailsComponent,
  },
  {
    path: 'students-register',
    component: StudentFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
