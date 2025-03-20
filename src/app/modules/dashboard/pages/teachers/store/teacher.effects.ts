import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, tap } from 'rxjs/operators';
import { TeacherActions } from './teacher.actions';
import { of } from 'rxjs';
import { TeachersService } from '../../../../../core/services/teachers.service';

@Injectable()
export class TeacherEffects {
  private actions$ = inject(Actions);

  constructor(private teacherService: TeachersService) {}

  loadTeachers$ = createEffect(() => {
    return this.actions$.pipe(
      //Listen to this type action
      ofType(TeacherActions.loadTeachers),
      concatMap(() =>
        this.teacherService.getTeachers().pipe(
          //if its okay
          map((teachers) =>
            TeacherActions.loadTeachersSuccess({ data: teachers })
          ),
          //if its failure
          catchError((error) =>
            of(TeacherActions.loadTeachersFailure({ error }))
          )
        )
      )
    );
  });

  // Edit
  editTeacher$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeacherActions.editTeacher),
      concatMap((action) =>
        this.teacherService
          .updateTeacherById(action.id, action.updatedTeacher)
          .pipe(
            //if its ok
            map((teacher) => TeacherActions.editTeacherSuccess({ teacher })),
            //if its failure
            catchError((error) =>
              of(TeacherActions.editTeacherFailure({ error }))
            )
          )
      )
    )
  );

  // Delete
  deleteTeacher$ = createEffect(() => {
    return this.actions$.pipe(
      //Listen to this type action
      ofType(TeacherActions.deleteTeacher),
      concatMap((action) =>
        this.teacherService.deleteTeacherById(action.id).pipe(
          //if its okay
          map(() => TeacherActions.deleteTeacherSuccess({ id: action.id })),
          //if its failure
          catchError((error) =>
            of(TeacherActions.deleteTeacherFailure({ error }))
          )
        )
      )
    );
  });

  //Get teacher by id
  getTeacherById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeacherActions.detailsTeacher),
      switchMap(({ id }) => {
        return this.teacherService.getTeacherById(id).pipe(
          tap((teacher) => console.log('✅ Teacher from API:', teacher)),
          map((teacher) => TeacherActions.detailsTeacherSuccess({ teacher })),
          catchError((error) => {
            return of(TeacherActions.detailsTeacherFailure({ error }));
          })
        );
      })
    );
  });

  //Create teacher
  createTeacher$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeacherActions.createTeacher),
      concatMap((action) =>
        this.teacherService.addTeacher(action.teacher).pipe(
          //if its okay
          map(() =>
            TeacherActions.createTeacherSuccess({ teacher: action.teacher })
          ),
          //if its failure
          catchError((error) =>
            of(TeacherActions.createTeacherFailure({ error }))
          )
        )
      )
    );
  });
}
