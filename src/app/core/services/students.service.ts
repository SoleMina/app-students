import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, map, Observable, of } from 'rxjs';
import { Student } from '../../modules/dashboard/pages/students/models';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private httpClient: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${environment.baseApiUrl}/students`);
  }

  getStudentById(id: any): Observable<Student> {
    return this.httpClient.get<Student>(
      `${environment.baseApiUrl}/students/${id}`
    );
  }

  addStudent(student: Student): Observable<Student[]> {
    return this.httpClient
      .post<Student>(`${environment.baseApiUrl}/students`, student)
      .pipe(concatMap(() => this.getStudents()));
  }

  updateStudent(updatedStudent: Student): Observable<Student[]> {
    return this.httpClient
      .patch<Student>(
        `${environment.baseApiUrl}/students/${updatedStudent.id}`,
        updatedStudent
      )
      .pipe(concatMap(() => this.getStudents()));
  }

  deleteStudentById(id: any): Observable<Student[]> {
    return this.httpClient
      .delete<Student>(`${environment.baseApiUrl}/students/${id}`)
      .pipe(concatMap(() => this.getStudents()));
  }
}
