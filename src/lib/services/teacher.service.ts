import { Teacher, TeacherAssignment, TeacherFormData } from "@/types/teacher";

class TeacherService {
  private apiUrl = "/api/v1/teachers";

  async getTeachers(): Promise<Teacher[]> {
    const response = await fetch(this.apiUrl);
    if (!response.ok) throw new Error("Failed to fetch teachers");
    return response.json();
  }

  async getTeacherById(id: string): Promise<Teacher> {
    const response = await fetch(`${this.apiUrl}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch teacher");
    return response.json();
  }

  async createTeacher(data: TeacherFormData): Promise<Teacher> {
    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create teacher");
    return response.json();
  }

  async updateTeacher(
    id: string,
    data: Partial<TeacherFormData>
  ): Promise<Teacher> {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update teacher");
    return response.json();
  }

  async deleteTeacher(id: string): Promise<void> {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete teacher");
  }

  async getTeacherAssignments(teacherId: string): Promise<TeacherAssignment[]> {
    const response = await fetch(`${this.apiUrl}/${teacherId}/assignments`);
    if (!response.ok) throw new Error("Failed to fetch teacher assignments");
    return response.json();
  }

  async assignTeacherToClass(
    teacherId: string,
    classId: string,
    courseId: string
  ): Promise<TeacherAssignment> {
    const response = await fetch(`${this.apiUrl}/${teacherId}/assignments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classId, courseId }),
    });
    if (!response.ok) throw new Error("Failed to assign teacher");
    return response.json();
  }
}
