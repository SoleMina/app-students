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
import { Student } from '../../models';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { StudentsService } from '../../../../../../core/services/students.service';
import { generateRandomString } from '../../../../../../shared/utils';
import { Course, Teacher } from '../../../../../../shared/models';
import { TeachersService } from '../../../../../../core/services/teachers.service';
import { CoursesService } from '../../../../../../core/services/courses.service';

@Component({
  selector: 'app-student-form',
  standalone: false,
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit, OnChanges {
  @Input() student: Student | null = null; // For editing a specific student
  @Input() students: Student[] = []; // Ensure students is always initialized
  @Output() studentData = new EventEmitter<Student>(); // Emit the added/updated student

  teachersList: Teacher[] = [];
  coursesList: Course[] = [];

  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentService: StudentsService,
    private teacherService: TeachersService,
    private coursesService: CoursesService
  ) {
    this.studentForm = this.fb.group({
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      course: [null, Validators.required],
      teacher: [null, Validators.required],
    });
  }
  ngOnInit(): void {
    this.teacherService.getTeachers().subscribe({
      next: (data) => {
        this.teachersList = [...data];
      },
    });
    this.coursesService.getCourses().subscribe({
      next: (data) => {
        this.coursesList = [...data];
      },
    });

    this.studentForm.get('course')?.valueChanges.subscribe((selectedCourse) => {
      this.filterTeachersByCourse(selectedCourse);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student'] && this.student) {
      this.studentForm.patchValue(this.student);
    }
  }

  onSubmit() {
    console.log(this.studentForm.value, 'this.studentForm.value');
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const formDataStudent = this.studentForm.value;

    const updatedStudent: Student = this.student
      ? { ...this.student, ...formDataStudent } // Update the existing student
      : { id: generateRandomString(6), ...formDataStudent }; // Create a new student

    this.studentData.emit(updatedStudent);

    Swal.fire({
      icon: 'success',
      title: this.student
        ? 'Student has been updated!'
        : 'Student has been Submitted!',
      showConfirmButton: false,
      timer: 1500,
    });

    this.studentForm.reset();

    if (!this.student) {
      ('inside add student');
      this.studentService.addStudent(updatedStudent).subscribe({
        next: (data) => console.log(data),
      });
      this.router.navigate(['/dashboard/students']);
    }

    this.student = null;
  }

  filterTeachersByCourse(courseName: string) {
    if (!courseName) {
      this.teachersList = [];
      return;
    }

    this.teacherService.getTeachers().subscribe({
      next: (data) => {
        this.teachersList = data.filter((teacher) =>
          teacher.course.includes(courseName)
        );
      },
    });

    // Reset teacher input value
    this.studentForm.get('teacher')?.setValue(null);
  }
}
