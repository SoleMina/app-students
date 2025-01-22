import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from './models';

@Component({
  selector: 'app-students',
  standalone: false,

  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  studentForm: FormGroup;

  students: Student[] = [
    {
      id: '001',
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

  onSubmit() {}
}
