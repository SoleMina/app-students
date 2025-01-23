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
    {
      id: 2,
      name: 'Juana',
      lastname: 'Sanchez',
      email: 'sara-2025@gmail.com',
      course: 'React',
      teacher: 'Eduardo Pinedo',
    },
    {
      id: 3,
      name: 'Leo',
      lastname: 'Estrada',
      email: 'leoestrada@gmail.com',
      course: 'React',
      teacher: 'Eduardo Pinedo',
    },
  ];

  addStudent(newStudent: any) {
    this.students = [...this.students, newStudent];
  }
}
