import { Component } from '@angular/core';
import { Student } from './models';

@Component({
  selector: 'app-students',
  standalone: false,

  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  students: Student[] = [
    {
      id: 1,
      name: 'Sam',
      lastname: 'Tineo',
      email: 'sam@gmail.com',
      course: 'Angular',
      teacher: 'Juan Alvarez',
    },
  ];

  addStudent(newStudent: Student) {
    this.students = [...this.students, newStudent];
  }
}
