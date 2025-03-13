import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EnrollmentsService } from '../../../../../../core/services/enrollments.service';
import { Enrollment } from '../../models';

@Component({
  selector: 'app-enrollments-table',
  standalone: false,

  templateUrl: './enrollments-table.component.html',
  styleUrl: './enrollments-table.component.scss',
})
export class EnrollmentsTableComponent implements OnInit, OnDestroy, OnChanges {
  @Input() enrollments: Observable<Enrollment[]> = of([]);
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();

  displayedColumns: string[] = ['id', 'studentId', 'courseId', 'actions'];
  dataSource: MatTableDataSource<Enrollment>;

  constructor(
    private enrollementsService: EnrollmentsService,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnDestroy(): void {
    this.enrollementsService.resetEnrollmentState();
  }

  ngOnInit(): void {
    this.enrollments.subscribe({
      next: (enrollment: Enrollment[]) => {
        this.dataSource.data = [...enrollment];
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Update data source if enrollments input changes
    if (changes['enrollments'] && changes['enrollments'].currentValue) {
      changes['enrollments'].currentValue.subscribe(
        (enrollment: Enrollment[]) => {
          this.dataSource.data = [...enrollment];
        }
      );
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
