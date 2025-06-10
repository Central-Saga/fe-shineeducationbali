export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  status: "active" | "inactive";
}

class StudentService {
  private students: Student[] = [];

  async getStudents(): Promise<Student[]> {
    // TODO: Replace with actual API call
    return this.students;
  }

  async createStudent(student: Omit<Student, "id">): Promise<Student> {
    // TODO: Replace with actual API call
    const newStudent = {
      id: Math.random().toString(36).substr(2, 9),
      ...student,
    };
    this.students.push(newStudent);
    return newStudent;
  }

  async updateStudent(student: Student): Promise<Student> {
    // TODO: Replace with actual API call
    const index = this.students.findIndex((s) => s.id === student.id);
    if (index !== -1) {
      this.students[index] = student;
      return student;
    }
    throw new Error("Student not found");
  }

  async deleteStudent(id: string): Promise<void> {
    // TODO: Replace with actual API call
    const index = this.students.findIndex((s) => s.id === id);
    if (index !== -1) {
      this.students.splice(index, 1);
      return;
    }
    throw new Error("Student not found");
  }
}

export const studentService = new StudentService();
