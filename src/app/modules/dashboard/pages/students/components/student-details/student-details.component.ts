import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../models';
import { StudentsService } from '../../../../../../core/services/students.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-details',
  standalone: false,

  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss',
})
export class StudentDetailsComponent implements OnInit {
  isLoading = false;
  student: Student | null = null;
  errorMessage = '';

  constructor(
    private activedRoute: ActivatedRoute,
    private studentService: StudentsService
  ) {}
  ngOnInit(): void {
    this.isLoading = true;
    const studentId = this.activedRoute?.snapshot?.params['id'];

    this.studentService.getStudentById(studentId).subscribe({
      next: (data) => {
        console.log(data, 'data get id student');
        this.student = data;
        this.errorMessage = '';
      },
      complete: () => {
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        if (error instanceof HttpErrorResponse) {
          if (error.status === 404) {
            this.errorMessage = 'Student not found';
          }
        }
      },
    });
  }
}
