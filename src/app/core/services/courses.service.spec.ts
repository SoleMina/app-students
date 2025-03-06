import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Course } from '../../shared/models';
import { environment } from '../../../environments/environment.development';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService],
    });

    service = TestBed.inject(CoursesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch courses with authorization header', () => {
    const mockCourses: Course[] = [
      {
        id: '1',
        name: 'Angular',
      },
      {
        id: '2',
        name: 'React',
      },
    ];

    localStorage.setItem('access_token', 'test_token');

    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne(`${environment.baseApiUrl}/courses`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('test_token');
    req.flush(mockCourses);
  });
});
