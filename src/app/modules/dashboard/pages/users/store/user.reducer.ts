import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User } from '../models';

export const userFeatureKey = 'user';

export interface State {
  users: User[];
}

export const initialState: State = {
  users: [],
};

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => {
    return {
      ...state,
      users: [
        {
          id: '8485',
          name: 'jdfjdf',
          accessToken: 'djdfkf',
          email: 'email@gmail.com',
          password: '0123456',
          role: 'Admin',
        },
        {
          id: '9494',
          name: 'seiis',
          accessToken: 'kfdkfdk',
          email: 'seiis@gmail.com',
          password: '0123456',
          role: 'Admin',
        },
      ],
    };
  }),
  on(UserActions.deleteUserById, (state, action) => {
    return {
      ...state,
      users: state.users.filter((user) => user.id !== action.id),
    };
  }),
  on(UserActions.resetState, () => initialState)
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});
