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
  coursesList: Course[] = [];

  teacherForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeachersService,
    private coursesService: CoursesService,
    private route: Router
  ) {
    this.teacherForm = this.fb.group({
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      course: [null, Validators.required],
    });
  }
  ngOnInit(): void {
    this.coursesService.getCourses().subscribe({
      next: (data) => {
        this.coursesList = [...data];
      },
    });
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
      this.teacherService.addTeacher(teacherObj).subscribe({
        next: (data) => {
          this.teachers = [...data];
        },
        complete: () => {
          this.route.navigate(['dashboard/teachers']);
        },
      });
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
