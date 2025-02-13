import { Injectable } from '@angular/core';
import { Teacher } from '../../shared/models';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  teachers: Teacher[] = [
    {
      id: '001',
      name: 'John',
      lastname: 'Doe',
      email: 'john@gmail.com',
      course: 'Angular',
    },
    {
      id: '002',
      name: 'Sthepen',
      lastname: 'Cano',
      email: 'sthepen@gmail.com',
      course: 'React',
    },
    {
      id: '003',
      name: 'Eduardo',
      lastname: 'Pinedo',
      email: 'eduardo@gmail.com',
      course: 'Vue',
    },
  ];

  constructor() {}

  getTeachers(): Observable<Teacher[]> {
    return of([...this.teachers]).pipe(delay(1000));
  }

  addTeacher(teacher: Teacher): Observable<Teacher[]> {
    this.teachers.push(teacher);
    return this.getTeachers();
  }
  deleteTeacherById(id: string): Observable<Teacher[]> {
    this.teachers = this.teachers.filter((teacher) => teacher.id !== id);
    return this.getTeachers();
  }
  updateTeacher(updatedCourse: Teacher): Observable<Teacher[]> {
    this.teachers = this.teachers.map((teacher) =>
      teacher.id === updatedCourse.id
        ? { ...teacher, ...updatedCourse }
        : { ...teacher }
    );
    return this.getTeachers();
  }
}
