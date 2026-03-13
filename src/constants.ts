import { AppState } from './types';

export const INITIAL_STATE: AppState = {
  activeTab: '主页',
  storageUsage: 88,
  emotionScore: 65,
  relationships: [
    {
      id: '1',
      name: 'T老师',
      progress: 75,
      color: '#4ADE80',
      avatar: 'https://picsum.photos/seed/teacher/100/100',
      memoryCount: 16
    },
    {
      id: '2',
      name: '陈雪',
      progress: 45,
      color: '#A855F7',
      avatar: 'https://picsum.photos/seed/friend/100/100',
      memoryCount: 12
    }
  ],
  memories: [
    {
      id: 'm1',
      title: '景迈山',
      date: '2025.5',
      tags: ['旅游', '朋友', '自然'],
      imageUrl: 'https://picsum.photos/seed/mountain/400/300',
      emotion: 80
    },
    {
      id: 'm2',
      title: '北京',
      date: '2025.11',
      tags: ['旅游', '自己', '人文'],
      imageUrl: 'https://picsum.photos/seed/beijing/400/300',
      emotion: 70
    }
  ],
  aiColors: ['#22D3EE', '#3B82F6', '#9333EA'], // Cyan, Blue, Purple
  featuredLiked: false
};
