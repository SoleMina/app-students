import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course, Teacher } from '../../../../../../shared/models';
import { TeachersService } from '../../../../../../core/services/teachers.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { generateRandomString } from '../../../../../../shared/utils';
import { CoursesService } from '../../../../../../core/services/courses.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TeacherActions } from '../../store/teacher.actions';
import {
  selectIsLoadingTeachers,
  selectTeachers,
} from '../../store/teacher.selectors';

@Component({
  selector: 'app-teacher-form',
  standalone: false,

  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.scss',
})
export class TeacherFormComponent implements OnInit, OnChanges {
  @Input() teacher: Teacher | null = null;
  @Input() teachers: Teacher[] = [];
  @Output() teacherData = new EventEmitter<Teacher>();
  coursesList$: Observable<Course[]>;

  isLoading$: Observable<boolean>;

  teacherForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeachersService,
    private coursesService: CoursesService,
    private route: Router,
    private store: Store
  ) {
    this.teacherForm = this.fb.group({
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      course: [null, Validators.required],
    });
    this.isLoading$ = this.store.select(selectIsLoadingTeachers);
  }
  ngOnInit(): void {
    this.coursesList$ = this.store.select(selectTeachers);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['teacher'] && this.teacher) {
      this.teacherForm.patchValue(this.teacher);
    }
  }

  onSubmit() {
    console.log('inside submit');
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
      return;
    }

    const formDataTeacher = this.teacherForm.value;

    const teacherObj: Teacher = this.teacher
      ? { ...this.teacher, ...formDataTeacher }
      : { id: generateRandomString(6), ...formDataTeacher };

    if (!this.teacher) {
      console.log('inside add teacher');
      this.store.dispatch(
        TeacherActions.createTeacher({ teacher: teacherObj })
      );
    } else {
      this.teacherData.emit(teacherObj);
    }

    Swal.fire({
      icon: 'success',
      title: this.teacher
        ? 'Teacher has been updated!'
        : 'Teacher has been Submitted!',
      showConfirmButton: false,
      timer: 1500,
    });

    this.teacherForm.reset();
  }
}
