import { Course } from '../../../../../shared/models';

export interface Student {
  id: string;
  name: string;
  lastname: string;
  email: string;
  teacher: string;
  course: string;
}

export interface NavbarItems {
  name: string;
  link: string;
  icon: string;
}
