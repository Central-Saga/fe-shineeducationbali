export interface GradesOverview {
  totalScores: number;
  averageScore: number;
  scoredStudents: number;
  unscoredStudents: number;
  totalStudents: number;
  lastMonthIncrease: number;
  lastPeriodIncrease: number;
}

export const gradesOverview: GradesOverview = {
  totalScores: 2345,
  averageScore: 85.6,
  scoredStudents: 120,
  unscoredStudents: 30,
  totalStudents: 150,
  lastMonthIncrease: 180,
  lastPeriodIncrease: 2.1,
};
