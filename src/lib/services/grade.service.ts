import {
  Grade,
  GradeTemplate,
  GradeSummary,
  GradeComponents,
  GradeFormData,
} from "@/types/grade";
import { apiRequest } from "../api";
 
class GradeService {
  private apiUrl = "/api/v1/grades";

  // Helper untuk menghitung nilai akhir berdasarkan template
  private calculateFinalGrade(
    components: GradeComponents,
    template: GradeTemplate
  ): number {
    let finalGrade = 0;
    let totalWeight = 0;

    template.components.forEach((comp) => {
      const value = components[comp.name];
      if (value !== undefined) {
        finalGrade += value * comp.weight;
        totalWeight += comp.weight;
      }
    });

    return totalWeight > 0
      ? Math.round((finalGrade / totalWeight) * 10) / 10
      : 0;
  }

  // Generator ID Nilai
  private generateGradeId(): string {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `INB${year}${month}${random}`;
  }

  async getGrades(filters?: {
    studentId?: string;
    courseId?: string;
    teacherId?: string;
    status?: "DRAFT" | "PUBLISHED";
  }): Promise<Grade[]> {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
    }

    return apiRequest<Grade[]>("GET", `${this.apiUrl}?${queryParams.toString()}`);
  }

  async getGradeById(id: string): Promise<Grade> {
    return apiRequest<Grade>("GET", `${this.apiUrl}/${id}`);
  }

  async createGrade(data: GradeFormData): Promise<Grade> {
    // Fetch grade template
    const template = await this.getGradeTemplate(data.courseId);

    // Calculate final grade
    const finalGrade = this.calculateFinalGrade(data.components, template);

    const gradeData = {
      ...data,
      id: this.generateGradeId(),
      finalGrade,
      status: "DRAFT",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return apiRequest<Grade>("POST", this.apiUrl, gradeData);
  }

  async updateGrade(id: string, data: Partial<GradeFormData>): Promise<Grade> {
    const currentGrade = await this.getGradeById(id);
    const template = await this.getGradeTemplate(currentGrade.courseId);

    // Recalculate final grade if components changed
    const finalGrade = data.components
      ? this.calculateFinalGrade(data.components, template)
      : currentGrade.finalGrade;

    return apiRequest<Grade>("PUT", `${this.apiUrl}/${id}`, {
      ...data,
      finalGrade,
      updatedAt: new Date(),
    });
  }

  async publishGrade(id: string): Promise<Grade> {
    const grade = await this.getGradeById(id);
    const template = await this.getGradeTemplate(grade.courseId);

    // Validasi komponen nilai
    const missingComponents = template.components
      .filter((comp) => comp.required && !grade.components[comp.name])
      .map((comp) => comp.name);

    if (missingComponents.length > 0) {
      throw new Error(
        `Komponen nilai berikut wajib diisi: ${missingComponents.join(", ")}`
      );
    }

    return apiRequest<Grade>("PUT", `${this.apiUrl}/${id}/publish`);
  }

  async getGradeTemplate(courseId: string): Promise<GradeTemplate> {
    return apiRequest<GradeTemplate>("GET", `/api/v1/courses/${courseId}/grade-template`);
  }

  async getStudentGradeSummary(studentId: string): Promise<GradeSummary[]> {
    return apiRequest<GradeSummary[]>("GET", `${this.apiUrl}/summary/${studentId}`);
  }
}
