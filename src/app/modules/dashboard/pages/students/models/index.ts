import { Course } from '../../../../../shared/models';

export interface Student {
  id: number;
  name: string;
  lastname: string;
  email: string;
  course: string;
  teacher: string;
  courses?: Course[];
}

export interface NavbarItems {
  name: string;
  link: string;
  icon: string;
}
