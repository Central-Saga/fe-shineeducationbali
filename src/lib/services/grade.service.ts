// import {
//   Grade,
//   GradeTemplate,
//   GradeSummary,
//   GradeComponents,
//   GradeFormData,
// } from "@/types/grade";
// import { apiRequest } from "../api";
 
// class GradeService {
//   private apiUrl = "/api/v1/grades";

//   // Helper untuk menghitung nilai akhir berdasarkan template
//   private calculateFinalGrade(
//     components: GradeComponents,
//     template: GradeTemplate
//   ): number {
//     let finalGrade = 0;
//     let totalWeight = 0;

//     Object.entries(components).forEach(([componentName, score]) => {
//       const templateComponent = template.components.find(
//         (comp) => comp.name === componentName
//       );
//       if (templateComponent && score !== null) {
//         finalGrade += score * (templateComponent.weight / 100);
//         totalWeight += templateComponent.weight;
//       }
//     });

//     // Jika tidak semua komponen terisi, normalisasi berdasarkan bobot yang ada
//     if (totalWeight > 0 && totalWeight < 100) {
//       finalGrade = (finalGrade * 100) / totalWeight;
//     }

//     return Math.round(finalGrade * 100) / 100; // Round to 2 decimal places
//   }

//   // Grade Management
//   async getGrades(filters?: {
//     courseId?: string;
//     studentId?: string;
//     templateId?: string;
//   }): Promise<Grade[]> {
//     const queryParams = new URLSearchParams();
//     if (filters?.courseId) queryParams.append("courseId", filters.courseId);
//     if (filters?.studentId) queryParams.append("studentId", filters.studentId);
//     if (filters?.templateId) queryParams.append("templateId", filters.templateId);

//     const url = queryParams.toString()
//       ? `${this.apiUrl}?${queryParams}`
//       : this.apiUrl;

//     return apiRequest<Grade[]>("GET", url);
//   }

//   async getGradeById(id: string): Promise<Grade> {
//     return apiRequest<Grade>("GET", `${this.apiUrl}/${id}`);
//   }

//   async createGrade(data: GradeFormData): Promise<Grade> {
//     return apiRequest<Grade>("POST", this.apiUrl, data);
//   }

//   async updateGrade(
//     id: string,
//     data: Partial<GradeFormData>
//   ): Promise<Grade> {
//     return apiRequest<Grade>("PUT", `${this.apiUrl}/${id}`, data);
//   }

//   async deleteGrade(id: string): Promise<void> {
//     return apiRequest<void>("DELETE", `${this.apiUrl}/${id}`);
//   }

//   // Bulk grade operations
//   async bulkCreateGrades(grades: GradeFormData[]): Promise<Grade[]> {
//     return apiRequest<Grade[]>("POST", `${this.apiUrl}/bulk`, { grades });
//   }

//   async bulkUpdateGrades(
//     updates: { id: string; data: Partial<GradeFormData> }[]
//   ): Promise<Grade[]> {
//     return apiRequest<Grade[]>("PUT", `${this.apiUrl}/bulk`, { updates });
//   }

//   // Grade Templates
//   async getGradeTemplates(): Promise<GradeTemplate[]> {
//     return apiRequest<GradeTemplate[]>("GET", `${this.apiUrl}/templates`);
//   }

//   async createGradeTemplate(template: Omit<GradeTemplate, "id">): Promise<GradeTemplate> {
//     return apiRequest<GradeTemplate>("POST", `${this.apiUrl}/templates`, template);
//   }

//   // Grade Reports  
//   async getGradeReport(
//     courseId: string,
//     filters?: { 
//       startDate?: string; 
//       endDate?: string;
//       studentIds?: string[];
//     }
//   ): Promise<GradeSummary> {
//     const queryParams = new URLSearchParams({ courseId });
//     if (filters?.startDate) queryParams.append("startDate", filters.startDate);
//     if (filters?.endDate) queryParams.append("endDate", filters.endDate);
//     if (filters?.studentIds) {
//       filters.studentIds.forEach(id => queryParams.append("studentIds", id));
//     }

//     return apiRequest<GradeSummary>("GET", `${this.apiUrl}/reports?${queryParams}`);
//   }

//   // Grade Analytics
//   async getGradeAnalytics(courseId: string): Promise<{
//     averageGrade: number;
//     passRate: number;
//     gradeDistribution: { grade: string; count: number }[];
//     topPerformers: { studentId: string; studentName: string; grade: number }[];
//     improvements: { studentId: string; studentName: string; improvement: number }[];
//   }> {
//     return apiRequest("GET", `${this.apiUrl}/analytics/${courseId}`);
//   }

//   // Export grades
//   async exportGrades(
//     format: "csv" | "xlsx" | "pdf",
//     filters?: {
//       courseId?: string;
//       studentId?: string;
//       startDate?: string;
//       endDate?: string;
//     }
//   ): Promise<Blob> {
//     const queryParams = new URLSearchParams({ format });
//     if (filters?.courseId) queryParams.append("courseId", filters.courseId);
//     if (filters?.studentId) queryParams.append("studentId", filters.studentId);
//     if (filters?.startDate) queryParams.append("startDate", filters.startDate);
//     if (filters?.endDate) queryParams.append("endDate", filters.endDate);

//     const response = await fetch(`${this.apiUrl}/export?${queryParams}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to export grades: ${response.statusText}`);
//     }

//     return response.blob();
//   }
// }

// export const gradeService = new GradeService();