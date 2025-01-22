import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../models';

@Component({
  selector: 'app-student-form',
  standalone: false,
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnChanges {
  @Input() student: Student | null = null; // For editing a specific student
  @Input() students: Student[] = []; // Ensure students is always initialized
  @Output() studentAdded = new EventEmitter<Student>(); // Emit the added/updated student

  studentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      course: [null, Validators.required],
      teacher: [null, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student'] && this.student) {
      // Populate the form with the selected student's data
      this.studentForm.patchValue(this.student);
    }
  }

  onSubmit() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const formData = this.studentForm.value;

    const updatedStudent: Student = this.student
      ? { ...this.student, ...formData } // Update the existing student
      : { id: Date.now(), ...formData }; // Create a new student

    console.log(updatedStudent, 'updatedStudent');

    this.studentAdded.emit(updatedStudent);

    this.studentForm.reset();
    this.student = null; // Reset the selected student
  }
}
