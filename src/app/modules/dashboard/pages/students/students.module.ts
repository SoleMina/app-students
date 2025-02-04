import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { StudentDialogFormComponent } from './components/student-dialog-form/student-dialog-form.component';
import { SharedModule } from '../../../../shared/shared.module';
import { StudentDetailsComponent } from './components/student-details/student-details.component';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentFormComponent,
    StudentTableComponent,
    StudentDialogFormComponent,
    StudentDetailsComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatPaginator,
    MatSort,
    SharedModule,
  ],
  exports: [StudentsComponent],
})
export class StudentsModule {}
