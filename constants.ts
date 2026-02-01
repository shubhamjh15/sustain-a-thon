import { UserStats, ActionLog, Mission, EducationModule } from './types';

export const INITIAL_USER_STATS: UserStats = {
  xp: 4250, // Corresponds to Level 5 (4000-4999 range)
  level: 5,
  co2Saved: 45.2,
  streak: 12,
  badges: ['Eco Starter', 'Plastic Free', 'Bike Rider']
};

export const RECENT_LOGS: ActionLog[] = [
  { id: '1', type: 'Recycled Glass', co2Impact: 0.5, xpReward: 50, date: 'Today', icon: '♻️' },
  { id: '2', type: 'Biked to Work', co2Impact: 2.1, xpReward: 100, date: 'Yesterday', icon: '🚲' },
  { id: '3', type: 'Meat-free Meal', co2Impact: 1.5, xpReward: 75, date: 'Yesterday', icon: '🥗' },
];

export const MISSIONS: Mission[] = [
  { id: 'm1', title: 'Plastic-Free Week', description: 'Avoid single-use plastics for 7 days.', rewardXP: 500, completed: false, type: 'weekly' },
  { id: 'm2', title: 'Zero Waste Day', description: 'Produce no landfill trash today.', rewardXP: 200, completed: true, type: 'daily' },
  { id: 'm3', title: 'Save 10 Litres', description: 'Take a shorter shower or fix a leak.', rewardXP: 100, completed: false, type: 'daily' },
  { id: 'm4', title: 'Plant a Tree', description: 'Plant a local species or donate to a planting org.', rewardXP: 1000, completed: false, type: 'weekly' },
];

export const EDUCATION_MODULES: EducationModule[] = [
  { id: 'e1', title: 'The Greenhouse Effect', description: 'Understand how gases trap heat.', readTime: '3 min', category: 'Climate', completed: true },
  { id: 'e2', title: 'Ocean Acidification', description: 'Why our oceans are changing pH.', readTime: '5 min', category: 'Climate', completed: false },
  { id: 'e3', title: 'Recycling 101', description: 'What actually happens to your plastic?', readTime: '4 min', category: 'Waste', completed: false },
  { id: 'e4', title: 'Renewable Energy', description: 'Solar, Wind, and Hydro explained.', readTime: '6 min', category: 'Energy', completed: false },
];