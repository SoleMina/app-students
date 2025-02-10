import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../../core/services/courses.service';

@Component({
  selector: 'app-courses',
  standalone: false,

  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  constructor(private courseService: CoursesService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }
}
