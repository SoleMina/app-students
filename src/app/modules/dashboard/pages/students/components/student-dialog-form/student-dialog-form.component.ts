import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models';

@Component({
  selector: 'app-student-dialog-form',
  standalone: false,

  templateUrl: './student-dialog-form.component.html',
  styleUrl: './student-dialog-form.component.scss',
})
export class StudentDialogFormComponent {
  @Input() student: Student | null = null; // For editing a specific student
  @Input() students: Student[] = []; // Ensure students is always initialized
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Student,
    private dialogRef: MatDialogRef<StudentDialogFormComponent>
  ) {}
  // onCancel(): void {
  //   this.dialogRef.close();
  // }
  onFormSubmit(updatedStudent: Student): void {
    this.dialogRef.close(updatedStudent);
  }
}
