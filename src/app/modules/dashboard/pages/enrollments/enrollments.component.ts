import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EnrollmentActions } from './store/enrollment.actions';
import { generateRandomString } from '../../../../shared/utils';
import { Observable } from 'rxjs';
import { Enrollment } from './models';
import {
  selectEnrollments,
  selectEnrollmentsError,
  selectIsLoadingEnrollment,
} from './store/enrollment.selectors';

@Component({
  selector: 'app-enrollments',
  standalone: false,

  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss',
})
export class EnrollmentsComponent implements OnInit, OnDestroy {
  enrollments$: Observable<Enrollment[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<unknown>;

  constructor(private store: Store) {
    this.enrollments$ = this.store.select(selectEnrollments);
    this.isLoading$ = this.store.select(selectIsLoadingEnrollment);
    this.error$ = this.store.select(selectEnrollmentsError);
  }

  ngOnInit(): void {
    this.store.dispatch(EnrollmentActions.loadEnrollments());
  }

  ngOnDestroy(): void {
    this.store.dispatch(EnrollmentActions.resetEnrollment());
  }

  createEnrollment(): void {
    this.store.dispatch(
      EnrollmentActions.createEnrollment({
        data: {
          courseId: generateRandomString(6),
          studentId: generateRandomString(6),
        },
      })
    );
  }
}
