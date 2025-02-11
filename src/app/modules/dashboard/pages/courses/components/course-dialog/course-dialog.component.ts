import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../../../../../shared/models';

@Component({
  selector: 'app-course-dialog',
  standalone: false,

  templateUrl: './course-dialog.component.html',
  styleUrl: './course-dialog.component.scss',
})
export class CourseDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Course,
    private dialogRef: MatDialogRef<CourseDialogComponent>
  ) {}

  onFormSubmit(updatedCourse: Course): void {
    this.dialogRef.close(updatedCourse);
  }
}
