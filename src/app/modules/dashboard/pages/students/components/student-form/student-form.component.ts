import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../models';

@Component({
  selector: 'app-student-form',
  standalone: false,

  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss',
})
export class StudentFormComponent {
  studentForm: FormGroup;

  students: Student[] = [
    {
      id: 1,
      name: 'Sam',
      lastname: 'Tineo',
      email: 'sam@gmail.com',
      course: 'Angular',
      teacher: 'Juan alvarez',
    },
  ];

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
    console.log(this.students, 'students submit');
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      console.log('inside submit');
      this.students = [
        ...this.students,
        {
          id: this.students.length + 1,
          ...this.studentForm.value,
        },
      ];
    }
  }
}
