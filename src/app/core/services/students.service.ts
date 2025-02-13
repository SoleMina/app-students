import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Student } from '../../modules/dashboard/pages/students/models';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  // private studentUrl = 'assets/students.json';
  students: Student[] = [
    {
      id: 1,
      name: 'Karina',
      lastname: 'Prado',
      email: 'karina.pradogutierrez@gmail.com',
      course: 'Angular',
      teacher: 'Sthepen Cano',
    },
    {
      id: 2,
      name: 'Sara',
      lastname: 'Carrillo',
      email: 'sara@gmail.com',
      course: 'React',
      teacher: 'Sthepen Cano',
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

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return of([...this.students]);
  }
  // getStudentById(id: any): Observable<Student> {
  //   return this.http
  //     .get<any[]>(this.studentUrl)
  //     .pipe(map((students) => students.find((student) => student.id === id)));
  // }
  addStudent(student: Student): Observable<Student[]> {
    this.students.push(student);
    return this.getStudents();
  }
  updateStudent(updatedStudent: Student): Observable<Student[]> {
    this.students = this.students.map((student) =>
      student.id === updatedStudent.id
        ? { ...student, ...updatedStudent }
        : student
    );

    return this.getStudents();
  }

  deleteStudentById(id: any): Observable<Student[]> {
    this.students = this.students.filter((student) => student.id !== id);
    return this.getStudents();
  }
}
