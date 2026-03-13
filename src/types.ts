export type TabType = '主页' | '记忆' | 'AI助手' | '关系' | '个人';

export interface MemoryCard {
  id: string;
  title: string;
  date: string;
  tags: string[];
  imageUrl: string;
  emotion: number; // 0-100
}

export interface Relationship {
  id: string;
  name: string;
  progress: number; // 0-100
  color: string;
  avatar: string;
  memoryCount: number;
}

export interface AppState {
  activeTab: TabType;
  storageUsage: number;
  emotionScore: number; // 0-100
  relationships: Relationship[];
  memories: MemoryCard[];
  aiColors: string[]; // Colors for the central liquid body
  featuredLiked: boolean;
}
