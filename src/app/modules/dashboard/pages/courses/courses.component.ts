import { Component, OnChanges, OnInit } from '@angular/core';
import { CoursesService } from '../../../../core/services/courses.service';
import { Course } from '../../../../shared/models';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';

@Component({
  selector: 'app-courses',
  standalone: false,

  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit, OnChanges {
  isLoading: boolean = false;
  courses: Course[] = [];
  constructor(
    private courseService: CoursesService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.courseService.getCourses().subscribe({
      next: (data) => {
        console.log(data);
        this.courses = [...data];
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnChanges() {
    if (this.courses && Array.isArray(this.courses)) {
      this.courses = [...this.courses];
      console.log(this.courses, 'this.courses');
    }
  }

  handleCoursesUpdate(data: Course[]): void {
    this.courses = [...data];
  }

  onDeleteCourse(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.deleteCourseById(id).subscribe({
          next: (data) => {
            this.handleCoursesUpdate(data);
          },
        });
        Swal.fire({
          title: 'Course has been deleted',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
  onEditCourse(course: Course): void {
    console.log(course, 'courseee karinaaa');
    const dialogRef = this.matDialog.open(CourseDialogComponent, {
      data: course,
    });

    console.log(dialogRef, 'dialogRef karinaaa');

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result, 'result');
      if (result) {
        this.updateCourse(result);
      }
    });
  }
  updateCourse(updatedCourse: Course): void {
    this.courseService.updateCourses(updatedCourse).subscribe({
      next: (updatedCourses) => {
        this.handleCoursesUpdate(updatedCourses);
      },
      error: (err) => {
        console.error('Error updating course:', err);
      },
    });
  }
}
