import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../../../../../shared/models';
import { ActivatedRoute } from '@angular/router';
import { TeachersService } from '../../../../../../core/services/teachers.service';
import { Store } from '@ngrx/store';
import { TeacherActions } from '../../store/teacher.actions';
import { selectTeacherById } from '../../store/teacher.selectors';
import { filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-details',
  standalone: true,
  imports: [CommonModule],

  templateUrl: './teacher-details.component.html',
  styleUrl: './teacher-details.component.scss',
})
export class TeacherDetailsComponent implements OnInit {
  isLoading: boolean = false;
  teacher$: Observable<Teacher | null> = of(null);
  errorMessage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private teachersService: TeachersService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    const teacherId = this.activatedRoute.snapshot.params['id'];
    console.log(teacherId, 'teacherId');

    if (teacherId) {
      this.teacher$ = this.store.select(selectTeacherById(teacherId)).pipe(
        tap((teacher) => {
          if (!teacher) {
            console.log('Dispatching action to fetch teacher');
            this.isLoading = false;
            this.store.dispatch(
              TeacherActions.detailsTeacher({ id: teacherId })
            );
          }
        }),
        filter((teacher): teacher is Teacher => !!teacher),
        tap((teacher) => console.log('Loaded teacher:', teacher))
      );
      console.log(this.teacher$, 'this.teacher$');
    }
  }
}
