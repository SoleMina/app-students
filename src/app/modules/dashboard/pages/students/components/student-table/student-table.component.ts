import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Student } from '../../models';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogFormComponent } from '../student-dialog-form/student-dialog-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-table',
  standalone: false,

  templateUrl: './student-table.component.html',
  styleUrl: './student-table.component.scss',
})
export class StudentTableComponent implements AfterViewInit, OnChanges {
  @Input() students: Student[] = [];

  displayedColumns: string[] = [
    'id',
    'name',
    'lastname',
    'email',
    'course',
    'teacher',
    'actions',
  ];
  dataSource: MatTableDataSource<Student>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private matDialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnChanges() {
    if (this.students && Array.isArray(this.students)) {
      this.dataSource.data = this.students;
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

  //Dialog form
  openDialogForm(): void {
    this.matDialog.open(StudentDialogFormComponent);
  }

  //Student
  deleteStudent(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.students = this.students.filter((student) => student.id !== id);
        this.dataSource.data = this.students;
        Swal.fire({
          title: 'Student has been deleted',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
  editStudent(element: Student): void {
    const dialogRef = this.matDialog.open(StudentDialogFormComponent, {
      width: '750px',
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result, 'result');
      if (result) {
        this.updateStudent(result);
      }
    });
  }
  updateStudent(updatedStudent: Student): void {
    console.log(updatedStudent, 'updatedStudent');
    const index = this.students.findIndex(
      (student) => student.id === updatedStudent.id
    );
    if (index > -1) {
      this.students[index] = updatedStudent;
      this.dataSource.data = [...this.students]; // Refresh the table
    }
  }
}
