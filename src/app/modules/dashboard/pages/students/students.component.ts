import { Component, OnInit } from '@angular/core';
import { Student } from './models';
import { StudentsService } from '../../../../services/students.service';

@Component({
  selector: 'app-students',
  standalone: false,

  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentsService) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
    });
  }

  addStudent(newStudent: any) {
    this.students = [...this.students, newStudent];
  }
}
