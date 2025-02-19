import { Injectable } from '@angular/core';
import { Teacher } from '../../shared/models';
import { concatMap, delay, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  // teachers: Teacher[] = [
  //   {
  //     id: '001',
  //     name: 'John',
  //     lastname: 'Doe',
  //     email: 'john@gmail.com',
  //     course: 'Angular',
  //   },
  //   {
  //     id: '002',
  //     name: 'Sthepen',
  //     lastname: 'Cano',
  //     email: 'sthepen@gmail.com',
  //     course: 'React',
  //   },
  //   {
  //     id: '003',
  //     name: 'Eduardo',
  //     lastname: 'Pinedo',
  //     email: 'eduardo@gmail.com',
  //     course: 'Vue',
  //   },
  // ];

  constructor(private httpClient: HttpClient) {}

  // getTeachers(): Observable<Teacher[]> {
  //   return of([...this.teachers]).pipe(delay(1000));
  // }
  getTeachers(): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(`${environment.baseApiUrl}/teachers`);
  }

  // addTeacher(teacher: Teacher): Observable<Teacher[]> {
  //   this.teachers.push(teacher);
  //   return this.getTeachers();
  // }
  addTeacher(teacher: Teacher): Observable<Teacher[]> {
    return this.httpClient
      .post<Teacher>(`${environment.baseApiUrl}/teachers`, teacher)
      .pipe(concatMap(() => this.getTeachers()));
  }
  // deleteTeacherById(id: string): Observable<Teacher[]> {
  //   this.teachers = this.teachers.filter((teacher) => teacher.id !== id);
  //   return this.getTeachers();
  // }
  deleteTeacherById(id: string): Observable<Teacher[]> {
    return this.httpClient
      .delete<Teacher>(`${environment.baseApiUrl}/teachers/${id}`)
      .pipe(concatMap(() => this.getTeachers()));
  }
  // updateTeacher(updatedCourse: Teacher): Observable<Teacher[]> {
  //   this.teachers = this.teachers.map((teacher) =>
  //     teacher.id === updatedCourse.id
  //       ? { ...teacher, ...updatedCourse }
  //       : { ...teacher }
  //   );
  //   return this.getTeachers();
  // }
  updateTeacher(updatedCourse: Teacher): Observable<Teacher[]> {
    return this.httpClient
      .patch<Teacher>(
        `${environment.baseApiUrl}/teachers/${updatedCourse.id}`,
        updatedCourse
      )
      .pipe(concatMap(() => this.getTeachers()));
  }
}
