import { TeachersService } from './teachers.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Teacher } from '../../shared/models';
import { environment } from '../../../environments/environment.development';

describe('TeachersService', () => {
  let service: TeachersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TeachersService],
    });
    service = TestBed.inject(TeachersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should fetch teachers', () => {
    const mockTeachers: Teacher[] = [
      {
        id: 'B01',
        name: 'John',
        lastname: 'Doesddsd',
        email: 'john@gmail.com',
        course: 'Vue',
      },
      {
        id: 'B02',
        name: 'Sthepen',
        lastname: 'Cano',
        email: 'sthepen@gmail.com',
        course: 'Angular',
      },
    ];
    service.getTeachers().subscribe({
      next: (teachers) => {
        expect(teachers.length).toBe(2);
        expect(teachers).toEqual(mockTeachers);
      },
    });
    const req = httpMock.expectOne(`${environment.baseApiUrl}/teachers`);
    expect(req.request.method).toBe('GET');
  });
});
