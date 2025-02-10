import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../../core/services/courses.service';
import { Course } from '../../../../shared/models';

@Component({
  selector: 'app-courses',
  standalone: false,

  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  isLoading: boolean = false;
  courses: Course[] = [];
  constructor(private courseService: CoursesService) {}

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
}
