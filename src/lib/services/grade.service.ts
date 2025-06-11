import {
  Grade,
  GradeFormData,
  GradeTemplate,
  GradeSummary,
  GradeComponents,
} from "@/types/grade";

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

    const response = await fetch(`${this.apiUrl}?${queryParams.toString()}`);
    if (!response.ok) throw new Error("Failed to fetch grades");
    return response.json();
  }

  async getGradeById(id: string): Promise<Grade> {
    const response = await fetch(`${this.apiUrl}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch grade");
    return response.json();
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

    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gradeData),
    });

    if (!response.ok) throw new Error("Failed to create grade");
    return response.json();
  }

  async updateGrade(id: string, data: Partial<GradeFormData>): Promise<Grade> {
    const currentGrade = await this.getGradeById(id);
    const template = await this.getGradeTemplate(currentGrade.courseId);

    // Recalculate final grade if components changed
    const finalGrade = data.components
      ? this.calculateFinalGrade(data.components, template)
      : currentGrade.finalGrade;

    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, finalGrade, updatedAt: new Date() }),
    });

    if (!response.ok) throw new Error("Failed to update grade");
    return response.json();
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

    const response = await fetch(`${this.apiUrl}/${id}/publish`, {
      method: "PUT",
    });

    if (!response.ok) throw new Error("Failed to publish grade");
    return response.json();
  }

  async getGradeTemplate(courseId: string): Promise<GradeTemplate> {
    const response = await fetch(`/api/v1/courses/${courseId}/grade-template`);
    if (!response.ok) throw new Error("Failed to fetch grade template");
    return response.json();
  }

  async getStudentGradeSummary(studentId: string): Promise<GradeSummary[]> {
    const response = await fetch(`${this.apiUrl}/summary/${studentId}`);
    if (!response.ok) throw new Error("Failed to fetch grade summary");
    return response.json();
  }
}
