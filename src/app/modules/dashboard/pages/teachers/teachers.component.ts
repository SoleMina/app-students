import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Teacher } from '../../../../shared/models';
import { TeachersService } from '../../../../core/services/teachers.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { TeacherDialogComponent } from './components/teacher-dialog/teacher-dialog.component';
import { Observable } from 'rxjs';
import { TeacherActions } from './store/teacher.actions';
import { Store } from '@ngrx/store';
import {
  selectIsLoadingTeachers,
  selectTeacherError,
  selectTeachers,
} from './store/teacher.selectors';

@Component({
  selector: 'app-teachers',
  standalone: false,

  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss',
})
export class TeachersComponent implements OnInit {
  isLoading$: Observable<boolean>;
  error$: Observable<unknown>;
  teachers$: Observable<Teacher[]>;

  constructor(
    private teacherService: TeachersService,
    private matDialog: MatDialog,
    private store: Store
  ) {
    this.teachers$ = this.store.select(selectTeachers);
    this.isLoading$ = this.store.select(selectIsLoadingTeachers);
    this.error$ = this.store.select(selectTeacherError);
    console.log(this.teachers$, 'this.teachers$');
  }

  ngOnInit(): void {
    this.store.dispatch(TeacherActions.loadTeachers());
  }

  onDelete(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(TeacherActions.deleteTeacher({ id }));
        this.store.dispatch(TeacherActions.loadTeachers());
        Swal.fire({
          title: 'Teacher has been deleted',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
  onEditTeacher(updatedTeacher: Teacher) {
    this.matDialog
      .open(TeacherDialogComponent, {
        data: updatedTeacher,
      })
      .afterClosed()
      .subscribe({
        next: (data) => {
          if (!!data) {
            this.store.dispatch(
              TeacherActions.editTeacher({
                id: data.id,
                updatedTeacher: data,
              })
            );
          }
        },
      });
  }
}
