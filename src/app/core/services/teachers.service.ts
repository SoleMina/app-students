import { Injectable } from '@angular/core';
import { Teacher } from '../../shared/models';
import { concatMap, delay, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  constructor(private httpClient: HttpClient) {}

  getTeachers(): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(`${environment.baseApiUrl}/teachers`);
  }

  getTeacherById(id: string): Observable<Teacher> {
    return this.httpClient.get<Teacher>(
      `${environment.baseApiUrl}/teachers/${id}`
    );
  }

  addTeacher(teacher: Teacher): Observable<Teacher[]> {
    return this.httpClient
      .post<Teacher>(`${environment.baseApiUrl}/teachers`, teacher)
      .pipe(concatMap(() => this.getTeachers()));
  }

  deleteTeacherById(id: string): Observable<Teacher[]> {
    return this.httpClient
      .delete<Teacher>(`${environment.baseApiUrl}/teachers/${id}`)
      .pipe(concatMap(() => this.getTeachers()));
  }

  // teachers.service.ts
  updateTeacherById(
    id: string,
    updatedTeacher: Partial<Teacher>
  ): Observable<Teacher> {
    return this.httpClient.patch<Teacher>(
      `${environment.baseApiUrl}/teachers/${id}`,
      updatedTeacher
    );
  }
}
