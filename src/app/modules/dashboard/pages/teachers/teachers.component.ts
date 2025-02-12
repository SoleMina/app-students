import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Teacher } from '../../../../shared/models';
import { TeachersService } from '../../../../core/services/teachers.service';

@Component({
  selector: 'app-teachers',
  standalone: false,

  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss',
})
export class TeachersComponent implements OnInit {
  isLoading: boolean = false;
  teachers: Teacher[] = [];

  constructor(private teacherService: TeachersService) {}

  ngOnInit(): void {
    this.teacherService.getTeachers().subscribe({
      next: (data) => {
        console.log(data, 'teachers data');
        this.teachers = [...data];
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
