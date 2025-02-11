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
import { StudentsService } from '../../../../../../core/services/students.service';

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

  constructor(
    private matDialog: MatDialog,
    private studentService: StudentsService
  ) {
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
        this.studentService.deleteStudentById(id).subscribe({
          next: (updatedStudents) => {
            this.students = updatedStudents;
            this.dataSource.data = [...this.students];
          },
        });
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
      panelClass: 'student-dialog',
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result, 'result');
      if (result) {
        this.studentService.updateStudent(result).subscribe({
          next: (updatedStudents) => {
            console.log(updatedStudents, 'updatedStudents');
            this.dataSource.data = updatedStudents;
          },
          error: (err) => {
            console.error('Error updating student:', err);
          },
        });
      }
    });
  }
}
