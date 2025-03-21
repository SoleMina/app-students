import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from '../../modules/dashboard/pages/enrollments/models';
import { environment } from '../../../environments/environment.development';
import { EnrollmentActions } from '../../modules/dashboard/pages/enrollments/store/enrollment.actions';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class EnrollmentsService {
  constructor(private httpClient: HttpClient, private store: Store) {}

  getEnrollments(): Observable<Enrollment[]> {
    return this.httpClient.get<Enrollment[]>(
      `${environment.baseApiUrl}/enrollments`
    );
  }

  createEnrollment(data: Omit<Enrollment, 'id'>): Observable<Enrollment> {
    return this.httpClient.post<Enrollment>(
      `${environment.baseApiUrl}/enrollments`,
      data
    );
  }

  resetEnrollmentState(): void {
    this.store.dispatch(EnrollmentActions.resetEnrollment());
  }

  deleteEnrollmentById(id: string): Observable<Enrollment> {
    return this.httpClient.delete<Enrollment>(
      `${environment.baseApiUrl}/enrollments/${id}`
    );
  }
}
