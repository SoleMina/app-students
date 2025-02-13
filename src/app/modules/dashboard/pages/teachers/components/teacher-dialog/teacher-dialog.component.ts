import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Teacher } from '../../../../../../shared/models';

@Component({
  selector: 'app-teacher-dialog',
  standalone: false,

  templateUrl: './teacher-dialog.component.html',
  styleUrl: './teacher-dialog.component.scss',
})
export class TeacherDialogComponent {
  @Input() teacher: Teacher | null = null;
  @Input() teachers: Teacher[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Teacher,
    private dialogRef: MatDialogRef<TeacherDialogComponent>
  ) {}

  onFormSubmit(updatedTeacher: Teacher): void {
    this.dialogRef.close(updatedTeacher);
  }
}
