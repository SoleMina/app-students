import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { Teacher } from '../../../../../../shared/models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-teachers-table',
  standalone: false,

  templateUrl: './teachers-table.component.html',
  styleUrl: './teachers-table.component.scss',
})
export class TeachersTableComponent implements OnChanges {
  @Input() teachers: Teacher[] = [];
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  @Output() edit: EventEmitter<Teacher> = new EventEmitter<Teacher>();

  displayedColumns: string[] = [
    'id',
    'name',
    'lastname',
    'email',
    'course',
    'actions',
  ];
  dataSource: MatTableDataSource<Teacher>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource();
  }

  ngOnChanges() {
    if (this.teachers && Array.isArray(this.teachers)) {
      this.dataSource.data = this.teachers;
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
