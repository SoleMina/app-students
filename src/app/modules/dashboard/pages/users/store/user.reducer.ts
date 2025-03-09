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
    };
  }),
  on(UserActions.loadUsersSuccess, (state, action) => {
    return {
      ...state,
      users: action.data,
    };
  }),
  on(UserActions.loadUsersFailure, (state, action) => {
    return {
      ...state,
    };
  }),
  on(UserActions.deleteUserById, (state, action) => {
    return {
      ...state,
      users: state.users.filter((user) => user.id !== action.id),
    };
  }),
  on(UserActions.resetUser, () => initialState)
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});
