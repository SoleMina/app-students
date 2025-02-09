import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './pages/students/students.component';

//Route defined dashboard/

const routes: Routes = [
  {
    path: 'students',
    component: StudentsComponent,
    loadChildren: () =>
      import('./pages/students/students.module').then((m) => m.StudentsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
