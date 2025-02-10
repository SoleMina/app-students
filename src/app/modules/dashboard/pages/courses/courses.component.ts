import { Component, OnInit } from '@angular/core';
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
export class CoursesComponent implements OnInit {
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

  handleCoursesUpdate(data: Course[]): void {
    this.courses = [...data];
  }

  // openFormDialog(data: Course): void {
  //   this.matDialog.open(CourseDialogComponent, {
  //     data: data,
  //   });
  // }

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
  onEditCourse(course: Course) {
    console.log(course, 'coursee');

    const dialogRef = this.matDialog.open(CourseDialogComponent, {
      data: course,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle the result if the dialog was closed with a valid result
        this.courseService.updatedCourses(result).subscribe({
          next: (updatedCourses) => {
            this.handleCoursesUpdate(updatedCourses);
          },
        });
      }
    });
  }
}
