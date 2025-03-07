import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from '../../modules/dashboard/pages/enrollments/models';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class EnrollmentsService {
  constructor(private httpClient: HttpClient) {}

  getEnrollments(): Observable<Enrollment[]> {
    return this.httpClient.get<Enrollment[]>(
      `${environment.baseApiUrl}/enrollments`
    );
  }
}
