import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../../../../core/services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../../../../../shared/models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-course-details',
  standalone: false,

  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss',
})
export class CourseDetailsComponent implements OnInit {
  isLoading = false;
  course: Course | null = null;
  errorMessage = '';

  constructor(
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute
  ) {
    //const courseId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.isLoading = true;
    const courseId = this.activatedRoute.snapshot.params['id'];
    this.coursesService.getCourseById(courseId).subscribe({
      next: (data) => {
        this.course = data;
        this.errorMessage = '';
      },
      complete: () => {
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        if (error instanceof HttpErrorResponse) {
          if (error.status === 404) {
            this.errorMessage = 'Course not found';
          }
        }
      },
    });
  }
}
