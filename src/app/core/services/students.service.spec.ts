import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { StudentsService } from './students.service';
import { Student } from '../../modules/dashboard/pages/students/models';
import { environment } from '../../../environments/environment.development';

describe('StudentsService', () => {
  let service: StudentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudentsService],
    });
    service = TestBed.inject(StudentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should fetch students', () => {
    const mockStudents: Student[] = [
      {
        id: 'S02',
        name: 'Sara',
        lastname: 'Carrillo',
        email: 'sara@gmail.com',
        course: 'Angular',
        teacher: 'Sthepen Cano',
      },
      {
        id: 'S03',
        name: 'Leo',
        lastname: 'Estrada',
        email: 'leoestrada@gmail.com',
        course: 'Vue',
        teacher: 'Eduardo Pinedo',
      },
    ];

    service.getStudents().subscribe((students) => {
      expect(students.length).toBe(2);
      expect(students).toEqual(mockStudents);
    });

    const req = httpMock.expectOne(`${environment.baseApiUrl}/students`);
    expect(req.request.method).toBe('GET');
  });
});
