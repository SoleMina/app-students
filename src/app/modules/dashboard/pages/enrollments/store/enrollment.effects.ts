import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { EnrollmentActions } from './enrollment.actions';
import { EnrollmentsService } from '../../../../../core/services/enrollments.service';

@Injectable()
export class EnrollmentEffects {
  private actions$ = inject(Actions);
  constructor(
    //private actions$: Actions,
    private enrollmentService: EnrollmentsService
  ) {}

  loadEnrollments$ = createEffect(() => {
    return this.actions$.pipe(
      //Listen to this type action
      ofType(EnrollmentActions.loadEnrollments),
      //Search for enrollment in my database
      concatMap(() =>
        this.enrollmentService.getEnrollments().pipe(
          //if its okay
          map((enrollment) =>
            EnrollmentActions.loadEnrollmentsSuccess({ data: enrollment })
          ),

          //if its failure
          catchError((error) =>
            of(EnrollmentActions.loadEnrollmentsFailure({ error }))
          )
        )
      )
    );
  });
  // loadEnrollments$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(EnrollmentActions.loadEnrollments),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => EnrollmentActions.loadEnrollmentsSuccess({ data })),
  //         catchError(error => of(EnrollmentActions.loadEnrollmentsFailure({ error }))))
  //     )
  //   );
  // });
}
