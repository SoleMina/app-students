import { Injectable } from '@angular/core';
import { Course } from '../../shared/models';
import { delay, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  courses: Course[] = [
    {
      id: '01',
      name: 'Angular',
      teacher: 'John Doe',
    },
    {
      id: '02',
      name: 'React',
      teacher: 'Sthepen Cano',
    },
    {
      id: '03',
      name: 'Vue',
      teacher: 'Eduardo Pinedo',
    },
  ];
  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return of([...this.courses]).pipe(delay(1000));
  }

  addCourse(course: Course): Observable<Course[]> {
    this.courses.push(course);
    return this.getCourses();
  }
}
