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

  createEnrollment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentActions.createEnrollment),
      concatMap((action) =>
        this.enrollmentService.createEnrollment(action.data).pipe(
          map((enrollment) =>
            EnrollmentActions.createEnrollmentSuccess({ data: enrollment })
          ),
          catchError((error) =>
            of(EnrollmentActions.createEnrollmentFailure({ error }))
          )
        )
      )
    );
  });

  createEnrollmentSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentActions.createEnrollmentSuccess),
      map(() => EnrollmentActions.loadEnrollments())
    )
  );

  deleteEnrollmentById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentActions.deleteEnrollment),
      concatMap((action) =>
        this.enrollmentService.deleteEnrollmentById(action.id).pipe(
          map(
            () => EnrollmentActions.deleteEnrollmentSuccess({ id: action.id }) // Send just the ID
          ),
          catchError((error) =>
            of(EnrollmentActions.deleteEnrollmentFailure({ error }))
          )
        )
      )
    );
  });
}
