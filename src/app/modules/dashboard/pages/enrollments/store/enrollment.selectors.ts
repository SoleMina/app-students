import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEnrollment from './enrollment.reducer';

export const selectEnrollmentState =
  createFeatureSelector<fromEnrollment.State>(
    fromEnrollment.enrollmentFeatureKey
  );

export const selectEnrollments = createSelector(
  selectEnrollmentState,
  (state) => state.enrollments
);

export const selectIsLoadingEnrollment = createSelector(
  selectEnrollmentState,
  (state) => state.isLoading
);

export const selectEnrollmentsError = createSelector(
  selectEnrollmentState,
  (state) => state.error
);
