import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
