export interface Course {
  id: string;
  name: string;
  teacher: string;
}

export interface Teacher {
  id: string;
  name: string;
  lastname: string;
  email: string;
  course: string;
}
