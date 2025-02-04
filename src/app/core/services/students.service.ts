import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Student } from '../../modules/dashboard/pages/students/models';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private studentUrl = 'assets/students.json';
  students: Student[] = [];

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentUrl);
  }
  getStudentById(id: any): Observable<Student> {
    // this.http.get<Student>(`${this.studentUrl}/${id}`)
    return this.http
      .get<any[]>(this.studentUrl)
      .pipe(map((students) => students.find((student) => student.id === id)));
  }
  addStudent(student: Student) {
    //return this.http.post<Student>(this.studentUrl, student);
    this.students.push(student);
  }
}
