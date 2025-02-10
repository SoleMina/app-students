import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsService } from '../../../../../../core/services/students.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Course } from '../../../../../../shared/models';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-courses-table',
  standalone: false,

  templateUrl: './courses-table.component.html',
  styleUrl: './courses-table.component.scss',
})
export class CoursesTableComponent {
  @Input() courses: Course[] = [];

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'course',
    'teacher',
    'actions',
  ];
  dataSource: MatTableDataSource<Course>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private matDialog: MatDialog,
    private studentService: StudentsService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnChanges() {
    if (this.courses && Array.isArray(this.courses)) {
      this.dataSource.data = this.courses;
    }
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editCourse(course: Course) {}
  deleteCourse(id: string) {}
}
