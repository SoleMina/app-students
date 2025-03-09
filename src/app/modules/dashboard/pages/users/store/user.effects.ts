import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { UserActions } from './user.actions';
import { UsersService } from '../../../../../core/services/users.service';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);

  constructor(private usersService: UsersService) {}

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      //Listen to this type action
      ofType(UserActions.loadUsers),
      //Search for enrollment in my database
      concatMap(() =>
        this.usersService.getUsers().pipe(
          //if its okay
          map((user) => UserActions.loadUsersSuccess({ data: user })),
          //if its failure
          catchError((error) => of(UserActions.loadUsersFailure({ error })))
        )
      )
    );
  });
}
