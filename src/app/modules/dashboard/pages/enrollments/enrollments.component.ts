import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EnrollmentActions } from './store/enrollment.actions';
import { generateRandomString } from '../../../../shared/utils';
import { forkJoin, Observable } from 'rxjs';
import { Enrollment } from './models';
import {
  selectEnrollments,
  selectEnrollmentsError,
  selectIsLoadingEnrollment,
} from './store/enrollment.selectors';
import { Course } from '../../../../shared/models';
import { Student } from '../students/models';
import { StudentsService } from '../../../../core/services/students.service';
import { CoursesService } from '../../../../core/services/courses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enrollments',
  standalone: false,

  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss',
})
export class EnrollmentsComponent implements OnInit, OnDestroy {
  enrollments$: Observable<Enrollment[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<unknown>;

  students$!: Observable<Student[]>;
  courses$!: Observable<Course[]>;

  enrollmentForm: FormGroup;

  constructor(
    private store: Store,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.enrollments$ = this.store.select(selectEnrollments);
    this.isLoading$ = this.store.select(selectIsLoadingEnrollment);
    this.error$ = this.store.select(selectEnrollmentsError);

    //form
    this.enrollmentForm = this.fb.group({
      studentId: [null, Validators.required],
      courseId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(EnrollmentActions.loadEnrollments());
    this.loadStudentsAndCourses();
  }

  ngOnDestroy(): void {
    this.store.dispatch(EnrollmentActions.resetEnrollment());
  }

  loadStudentsAndCourses(): void {
    this.courses$ = this.coursesService.getCourses();
    this.students$ = this.studentsService.getStudents();
  }

  createEnrollment(): void {
    this.store.dispatch(
      EnrollmentActions.createEnrollment({
        data: {
          courseId: generateRandomString(6),
          studentId: generateRandomString(6),
        },
      })
    );
  }

  onSubmit(): void {
    if (this.enrollmentForm.invalid) {
      this.enrollmentForm.markAllAsTouched();
      return;
    }

    this.store.dispatch(
      EnrollmentActions.createEnrollment({
        data: this.enrollmentForm.value,
      })
    );

    //Reset form
    this.enrollmentForm.reset();
    this.enrollmentForm.markAsPristine();
    this.enrollmentForm.markAsUntouched();

    this.cdr.detectChanges();

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Enrollment has been submitted!',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  onDeleteEnrollment(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(EnrollmentActions.deleteEnrollment({ id: id }));
        Swal.fire({
          title: 'Enrollment has been deleted',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
}
