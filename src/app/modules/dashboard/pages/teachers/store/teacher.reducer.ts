import { createFeature, createReducer, on } from '@ngrx/store';
import { TeacherActions } from './teacher.actions';
import { Teacher } from '../../../../../shared/models';

export const teacherFeatureKey = 'teacher';

export interface State {
  teachers: Teacher[];
  isLoading: boolean;
  error: unknown;
}

export const initialState: State = {
  teachers: [],
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(TeacherActions.loadTeachers, (state) => state),
  on(TeacherActions.loadTeachersSuccess, (state, action) => {
    return {
      ...state,
      teachers: action.data,
    };
  }),
  on(TeacherActions.loadTeachersFailure, (state, action) => {
    return {
      ...state,
    };
  }),
  on(TeacherActions.editTeacher, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(TeacherActions.editTeacherSuccess, (state, action) => {
    return {
      ...state,
      teachers: state.teachers.map((teacher) =>
        teacher.id === action.teacher.id ? action.teacher : teacher
      ),
      isLoading: false,
    };
  }),
  on(TeacherActions.editTeacherFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),
  on(TeacherActions.deleteTeacher, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(TeacherActions.deleteTeacherSuccess, (state, action) => {
    return {
      ...state,
      teachers: state.teachers.filter((teacher) => teacher.id !== action.id),
      isLoading: false,
    };
  }),
  on(TeacherActions.deleteTeacherFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),
  on(TeacherActions.detailsTeacher, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(TeacherActions.detailsTeacherSuccess, (state, { teacher }) => {
    console.log('📦 Storing teacher in state:', teacher);
    return {
      ...state,
      teachers: [...state.teachers.filter((t) => t.id !== teacher.id), teacher],
      isLoading: false,
    };
  }),
  on(TeacherActions.detailsTeacherFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),
  on(TeacherActions.createTeacher, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(TeacherActions.createTeacherSuccess, (state, action) => {
    return {
      ...state,
      teacher: [...state.teachers, action.teacher],
      isLoading: false,
    };
  }),
  on(TeacherActions.createTeacherFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  })
);

export const teacherFeature = createFeature({
  name: teacherFeatureKey,
  reducer,
});
