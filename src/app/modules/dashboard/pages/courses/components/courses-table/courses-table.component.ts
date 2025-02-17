import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Course } from '../../../../../../shared/models';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../../../../../core/services/auth.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-courses-table',
  standalone: false,

  templateUrl: './courses-table.component.html',
  styleUrl: './courses-table.component.scss',
})
export class CoursesTableComponent {
  @Input() courses: Course[] = [];
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  @Output() edit: EventEmitter<Course> = new EventEmitter<Course>();

  isAdmin$: Observable<boolean>;

  displayedColumns: string[] = ['id', 'name', 'teacher', 'actions'];
  dataSource: MatTableDataSource<Course>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authService: AuthService) {
    this.dataSource = new MatTableDataSource();
    this.isAdmin$ = this.authService.isAdmin$;
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
}
