import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Teacher } from '../../../../../../shared/models';
import { TeachersService } from '../../../../../../core/services/teachers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-form',
  standalone: false,

  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.scss',
})
export class TeacherFormComponent implements OnChanges {
  @Input() teacher: Teacher | null = null;
  @Input() teachers: Teacher[] = [];
  @Output() teacherData = new EventEmitter<Teacher>();

  teacherForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeachersService,
    private route: Router
  ) {
    this.teacherForm = this.fb.group({
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      course: [null, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['teacher'] && this.teacher) {
      this.teacherForm.patchValue(this.teacher);
    }
  }

  onSubmit() {
    console.log('inside submit');
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
      return;
    }

    const formDataTeacher = this.teacherForm.value;

    const teacherObj: Teacher = this.teacher
      ? { ...this.teacher, ...formDataTeacher }
      : { id: Date.now(), ...formDataTeacher };

    if (!this.teacher) {
      console.log('inside add teacher');
      this.teacherService.addTeacher(teacherObj).subscribe({
        next: (data) => {
          this.teachers = [...data];
        },
        complete: () => {
          this.route.navigate(['dashboard/teachers']);
        },
      });
    } else {
      this.teacherData.emit(teacherObj);
    }
  }
}
