import { Program } from "@/data/data-admin/program-data/program-data";
import { apiRequest } from "../api";

export interface ProgramFormData {
  name: string;
  description: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  price: number;
  isActive: boolean;
}

class ProgramService {
  private apiUrl = "/api/v1/programs";

  // Program Management
  async getPrograms(): Promise<Program[]> {
    return apiRequest<Program[]>("GET", this.apiUrl);
  }

  async getProgramById(id: string): Promise<Program> {
    return apiRequest<Program>("GET", `${this.apiUrl}/${id}`);
  }

  async createProgram(data: ProgramFormData): Promise<Program> {
    return apiRequest<Program>("POST", this.apiUrl, data);
  }

  async updateProgram(
    id: string,
    data: Partial<ProgramFormData>
  ): Promise<Program> {
    return apiRequest<Program>("PUT", `${this.apiUrl}/${id}`, data);
  }

  async deleteProgram(id: string): Promise<void> {
    return apiRequest<void>("DELETE", `${this.apiUrl}/${id}`);
  }
}

export const programService = new ProgramService();
