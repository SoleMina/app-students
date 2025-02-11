import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../../../../../shared/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-form',
  standalone: false,

  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent implements OnChanges {
  @Input() course: Course | null = null; // For editing a specific course
  @Input() courses: Course[] = []; // Ensure course is always initialized
  @Output() courseData = new EventEmitter<Course>(); // Emit the added/updated student

  courseForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      name: [null, Validators.required],
      teacher: [null, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course'] && this.course) {
      this.courseForm.patchValue(this.course);
    }
  }
  onSubmit() {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    const formDataCourse = this.courseForm.value;

    const updatedCourse: Course = this.course
      ? { ...this.course, ...formDataCourse } // Update the existing course
      : { id: Date.now(), ...formDataCourse }; // Create a new course

    this.courseData.emit(updatedCourse);

    Swal.fire({
      icon: 'success',
      title: this.course
        ? 'Student has been updated!'
        : 'Student has been Submitted!',
      showConfirmButton: false,
      timer: 1500,
    });

    this.courseForm.reset();
  }
}
