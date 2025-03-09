import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ data: User[] }>(),
    'Load Users Failure': props<{ error: unknown }>(),

    //
    'Delete User By Id': props<{ id: string }>(),
    'Reset User': emptyProps(),
  },
});
