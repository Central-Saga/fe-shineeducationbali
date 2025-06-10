import { Class, ClassSchedule } from "@/types/class";

class ClassService {
  private classes: Class[] = [];

  async getClasses(): Promise<Class[]> {
    // TODO: Implement API call
    return this.classes;
  }

  async getClassById(id: string): Promise<Class | null> {
    // TODO: Implement API call
    return this.classes.find((c) => c.id === id) || null;
  }

  async createClass(
    data: Omit<Class, "id" | "createdAt" | "updatedAt">
  ): Promise<Class> {
    // TODO: Implement API call
    const newClass = {
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data,
    };
    this.classes.push(newClass);
    return newClass;
  }

  async updateClass(id: string, data: Partial<Class>): Promise<Class> {
    // TODO: Implement API call
    const index = this.classes.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Class not found");

    this.classes[index] = {
      ...this.classes[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.classes[index];
  }

  async deleteClass(id: string): Promise<void> {
    // TODO: Implement API call
    const index = this.classes.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Class not found");
    this.classes.splice(index, 1);
  }

  async getClassSchedule(classId: string): Promise<ClassSchedule[]> {
    // TODO: Implement API call
    const classData = await this.getClassById(classId);
    return classData?.schedule || [];
  }
  async updateClassSchedule(
    classId: string,
    schedule: ClassSchedule[]
  ): Promise<void> {
    // TODO: Implement API call
    await this.updateClass(classId, { schedule });
  }

  async bulkPlaceStudents(
    placements: Array<{
      studentId: string;
      classId: string;
      placementDate: string;
      status: "active" | "completed" | "cancelled";
    }>
  ): Promise<void> {
    // TODO: Implement API call
    for (const placement of placements) {
      const classData = await this.getClassById(placement.classId);
      if (!classData) {
        throw new Error(`Class ${placement.classId} not found`);
      }

      // Check capacity
      if (classData.currentStudents >= classData.capacity) {
        throw new Error(`Class ${classData.name} is at full capacity`);
      }

      // Add student to class
      const updatedStudents = [...classData.students];
      updatedStudents.push({
        studentId: placement.studentId,
        packageId: "", // This should come from the actual package selection
        packageName: "", // This should come from the actual package selection
        name: "", // This should be fetched from student service
        joinDate: placement.placementDate,
        status: placement.status,
      });

      // Update class
      await this.updateClass(placement.classId, {
        students: updatedStudents,
        currentStudents: classData.currentStudents + 1,
      });
    }
  }
}

export const classService = new ClassService();
