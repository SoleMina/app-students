import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { StudentFormComponent } from './modules/dashboard/pages/students/components/student-form/student-form.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register-student', component: StudentFormComponent },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
