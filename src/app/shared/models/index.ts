export interface Course {
  id: string;
  name: string;
  teachers?: Teacher[];
}

export interface Teacher {
  id: string;
  name: string;
  lastname: string;
  email: string;
  course: string;
}
