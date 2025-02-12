import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() teacher: Teacher | null = null;
  @Input() teachers: Teacher[] = [];
  @Output() teacherData = new EventEmitter<Teacher>();

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

    const formDataTeacher = this.teacherForm.value;

    const teacherObj: Teacher = this.teacher
      ? { ...this.teacher, ...formDataTeacher }
      : { id: Date.now(), ...formDataTeacher };

    this.teacherData.emit(teacherObj);
  }
}
