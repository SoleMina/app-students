import { Injectable } from '@angular/core';
import { Course } from '../../shared/models';
import { concatMap, delay, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private httpClient: HttpClient) {}

  getCourses(): Observable<Course[]> {
    const myHeaders = new HttpHeaders().append(
      'Authorization',
      localStorage.getItem('access_token') || ''
    );
    return this.httpClient.get<Course[]>(`${environment.baseApiUrl}/courses`, {
      headers: myHeaders,
    });
  }

  addCourse(course: Course): Observable<Course[]> {
    return this.httpClient
      .post<Course>(`${environment.baseApiUrl}/courses`, course)
      .pipe(concatMap(() => this.getCourses()));
  }

  deleteCourseById(id: string): Observable<Course[]> {
    return this.httpClient
      .delete<Course>(`${environment.baseApiUrl}/courses/${id}`)
      .pipe(concatMap(() => this.getCourses()));
  }

  updateCourses(updatedCourse: Course): Observable<Course[]> {
    return this.httpClient
      .patch<Course>(
        `${environment.baseApiUrl}/courses/${updatedCourse.id}`,
        updatedCourse
      )
      .pipe(concatMap(() => this.getCourses()));
  }

  getCourseById(id: string): Observable<Course> {
    return this.httpClient.get<Course>(
      `${environment.baseApiUrl}/courses/${id}?_embed=teachers`
    );
  }
}
