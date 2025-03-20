import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTeacher from './teacher.reducer';

export const selectTeacherState = createFeatureSelector<fromTeacher.State>(
  fromTeacher.teacherFeatureKey
);

export const selectTeachers = createSelector(
  selectTeacherState,
  (state) => state.teachers
);

export const selectIsLoadingTeachers = createSelector(
  selectTeacherState,
  (state) => state.isLoading
);

export const selectTeacherError = createSelector(
  selectTeacherState,
  (state) => state.error
);

export const selectTeacherById = (id: string) =>
  createSelector(selectTeachers, (teachers) =>
    teachers ? teachers.find((teacher) => teacher.id === id) : null
  );
