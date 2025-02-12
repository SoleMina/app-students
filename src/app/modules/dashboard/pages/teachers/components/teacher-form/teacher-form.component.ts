import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Teacher } from '../../../../../../shared/models';
import { last } from 'rxjs';

@Component({
  selector: 'app-teacher-form',
  standalone: false,

  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.scss',
})
export class TeacherFormComponent {
  teacher: Teacher | null = null;
  teacherForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.teacherForm = this.fb.group({
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      course: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
      return;
    }
  }
}
