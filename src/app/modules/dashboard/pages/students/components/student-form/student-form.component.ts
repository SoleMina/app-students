import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../models';

@Component({
  selector: 'app-student-form',
  standalone: false,

  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss',
})
export class StudentFormComponent {
  @Output() studentAdded = new EventEmitter<Student>();
  studentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, Validators.required],
      course: [null, Validators.required],
      teacher: [null, Validators.required],
    });
  }

  onSubmit() {
    console.log(this.studentForm.value, 'values');
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    } else {
      const newStudent: Student = {
        id: Date.now(),
        ...this.studentForm.value,
      };

      this.studentAdded.emit(newStudent);
      this.studentForm.reset();
    }
  }
}
