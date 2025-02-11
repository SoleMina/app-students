import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    pathMatch: 'full',
  },
  {
    path: 'courses/:id',
    component: CourseDetailsComponent,
    pathMatch: 'full',
  },
  {
    path: 'courses-register',
    component: CourseFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
