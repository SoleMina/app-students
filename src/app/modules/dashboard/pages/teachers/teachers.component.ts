import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Teacher } from '../../../../shared/models';
import { TeachersService } from '../../../../core/services/teachers.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { TeacherDialogComponent } from './components/teacher-dialog/teacher-dialog.component';

@Component({
  selector: 'app-teachers',
  standalone: false,

  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss',
})
export class TeachersComponent implements OnInit {
  isLoading: boolean = false;
  teachers: Teacher[] = [];

  constructor(
    private teacherService: TeachersService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
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

  onDelete(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.teacherService.deleteTeacherById(id).subscribe({
          next: (data) => {
            this.teachers = [...data];
          },
        });
        Swal.fire({
          title: 'Teacher has been deleted',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
  onEditTeacher(updatedTeacher: Teacher) {
    const dialogRef = this.matDialog.open(TeacherDialogComponent, {
      data: updatedTeacher,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateTeacher(result);
      }
    });
  }
  updateTeacher(updatedTeacher: Teacher) {
    this.teacherService.updateTeacher(updatedTeacher).subscribe({
      next: (data) => {
        this.teachers = [...data];
      },
    });
  }
}
