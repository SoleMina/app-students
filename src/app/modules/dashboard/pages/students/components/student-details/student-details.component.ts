import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-details',
  standalone: false,

  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss',
})
export class StudentDetailsComponent {
  studentId: string;
  constructor(private activedRoute: ActivatedRoute) {
    console.log(activedRoute, 'activedRoute');
    this.studentId = activedRoute?.snapshot?.params['id'];
  }
}
