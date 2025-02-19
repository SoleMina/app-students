import { Injectable } from '@angular/core';
import { Course } from '../../shared/models';
import { concatMap, delay, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  // courses: Course[] = [
  //   {
  //     id: '01',
  //     name: 'Angular',
  //     teacher: 'John Doe',
  //   },
  //   {
  //     id: '02',
  //     name: 'React',
  //     teacher: 'Sthepen Cano',
  //   },
  //   {
  //     id: '03',
  //     name: 'Vue',
  //     teacher: 'Eduardo Pinedo',
  //   },
  // ];
  constructor(private httpClient: HttpClient) {}

  // getCourses(): Observable<Course[]> {
  //   return of([...this.courses]).pipe(delay(1000));
  // }
  getCourses(): Observable<Course[]> {
    const myHeaders = new HttpHeaders().append(
      'Authorization',
      localStorage.getItem('access_token') || ''
    );
    return this.httpClient.get<Course[]>(`${environment.baseApiUrl}/courses`, {
      headers: myHeaders,
    });
  }

  // addCourse(course: Course): Observable<Course[]> {
  //   this.courses.push(course);
  //   return this.getCourses();
  // }

  addCourse(course: Course): Observable<Course[]> {
    return this.httpClient
      .post<Course>(`${environment.baseApiUrl}/courses`, course)
      .pipe(concatMap(() => this.getCourses()));
  }
  // deleteCourseById(id: string): Observable<Course[]> {
  //   this.courses = this.courses.filter((course) => course.id !== id);
  //   return this.getCourses();
  // }
  deleteCourseById(id: string): Observable<Course[]> {
    return this.httpClient
      .delete<Course>(`${environment.baseApiUrl}/courses/${id}`)
      .pipe(concatMap(() => this.getCourses()));
  }
  // updateCourses(updatedCourse: Course): Observable<Course[]> {
  //   this.courses = this.courses.map((course) =>
  //     course.id === updatedCourse.id
  //       ? { ...course, ...updatedCourse }
  //       : { ...course }
  //   );
  //   return this.getCourses();
  // }
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
