
export enum InspectionStatus {
  PASSED = '合格',
  WARNING = '整改中',
  FAILED = '不合格'
}

export interface CheckItem {
  id: string;
  category: string;
  title: string;
  description: string;
  score: number;
  maxScore: number;
  status: 'Pass' | 'Fail' | 'N/A';
  comment: string;
}

export interface InspectionRecord {
  id: string;
  inspector: string;
  target: string;
  timestamp: string;
  totalScore: number;
  status: InspectionStatus;
  items: CheckItem[];
  aiAnalysis?: string;
  imageUrl?: string;
}

export interface StatisticsData {
  month: string;
  score: number;
  count: number;
}
