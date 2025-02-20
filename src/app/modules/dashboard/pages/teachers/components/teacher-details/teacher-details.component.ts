import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../../../../../shared/models';
import { ActivatedRoute } from '@angular/router';
import { TeachersService } from '../../../../../../core/services/teachers.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-teacher-details',
  standalone: false,

  templateUrl: './teacher-details.component.html',
  styleUrl: './teacher-details.component.scss',
})
export class TeacherDetailsComponent implements OnInit {
  isLoading: boolean = false;
  teacher: Teacher | null = null;
  errorMessage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private teachersService: TeachersService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    const teacherId = this.activatedRoute.snapshot.params['id'];
    this.teachersService.getTeacherById(teacherId).subscribe({
      next: (data) => {
        this.teacher = data;
      },
      complete: () => {
        this.isLoading = false;
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 404) {
            this.errorMessage = 'Teacher not found';
          }
        }
      },
    });
  }
}
