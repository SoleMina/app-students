import { Injectable } from '@angular/core';
import { Course } from '../../shared/models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  courses: Course[] = [
    {
      id: '01',
      name: 'Angular',
    },
    {
      id: '02',
      name: 'React',
    },
    {
      id: '03',
      name: 'Vue',
    },
  ];

  constructor() {}

  getCourses(): Observable<Course[]> {
    return of([...this.courses]);
  }
}
