import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Teacher } from '../../../../../shared/models';

export const TeacherActions = createActionGroup({
  source: 'Teacher',
  events: {
    //Load
    'Load Teachers': emptyProps(),
    'Load Teachers Success': props<{ data: Teacher[] }>(),
    'Load Teachers Failure': props<{ error: unknown }>(),

    //Create
    'Create Teacher': props<{ teacher: Teacher }>(),
    'Create Teacher Success': props<{ teacher: Teacher }>(),
    'Create Teacher Failure': props<{ error: unknown }>(),

    //Edit
    'Edit Teacher': props<{ id: string; updatedTeacher: Partial<Teacher> }>(),
    'Edit Teacher Success': props<{ teacher: Teacher }>(),
    'Edit Teacher Failure': props<{ error: unknown }>(),

    //Delete
    'Delete Teacher': props<{ id: string }>(),
    'Delete Teacher Success': props<{ id: string }>(),
    'Delete Teacher Failure': props<{ error: unknown }>(),

    //Get details
    'Details Teacher': props<{ id: string }>(),
    'Details Teacher Success': props<{ teacher: Teacher }>(),
    'Details Teacher Failure': props<{ error: unknown }>(),
  },
});
