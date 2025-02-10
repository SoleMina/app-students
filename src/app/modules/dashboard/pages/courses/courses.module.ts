import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesTableComponent,
    CourseFormComponent,
    CourseDialogComponent,
  ],
  imports: [CommonModule, CoursesRoutingModule, SharedModule],
})
export class CoursesModule {}
