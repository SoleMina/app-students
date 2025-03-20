import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersTableComponent } from './components/teachers-table/teachers-table.component';
import { TeachersComponent } from './teachers.component';
import { TeacherFormComponent } from './components/teacher-form/teacher-form.component';
import { TeacherDialogComponent } from './components/teacher-dialog/teacher-dialog.component';
import { SharedModule } from '../../../../shared/shared.module';
import { teacherFeature } from './store/teacher.reducer';
import { TeacherEffects } from './store/teacher.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    TeachersTableComponent,
    TeachersComponent,
    TeacherFormComponent,
    TeacherDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TeachersRoutingModule,
    StoreModule.forFeature(teacherFeature),
    EffectsModule.forFeature([TeacherEffects]),
  ],
})
export class TeachersModule {}
