import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Tracker } from './pages/Tracker';
import { Education } from './pages/Education';
import { Community } from './pages/Community';
import { AiAssistant } from './pages/AiAssistant';
import { Missions } from './pages/Missions';
import { Page, UserStats, ActionLog } from './types';
import { INITIAL_USER_STATS, RECENT_LOGS } from './constants';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  
  // Global State for Gamification
  const [stats, setStats] = useState<UserStats>(INITIAL_USER_STATS);
  const [logs, setLogs] = useState<ActionLog[]>(RECENT_LOGS);

  // Centralized XP and Action Logging Logic
  const handleLogAction = (actionName: string, xp: number, co2: number, icon: string) => {
    const newLog: ActionLog = {
      id: Date.now().toString(),
      type: actionName,
      co2Impact: co2,
      xpReward: xp,
      date: 'Just now',
      icon
    };
    
    setLogs([newLog, ...logs]);
    
    // Calculate new level based on 1000 XP per level
    const newXp = stats.xp + xp;
    const newLevel = Math.floor(newXp / 1000) + 1;
    const newCo2 = stats.co2Saved + co2;

    setStats(prev => ({
      ...prev,
      xp: newXp,
      level: newLevel,
      co2Saved: newCo2
    }));
  };

  const handleAddXpOnly = (xp: number) => {
    const newXp = stats.xp + xp;
    const newLevel = Math.floor(newXp / 1000) + 1;
    
    setStats(prev => ({
      ...prev,
      xp: newXp,
      level: newLevel
    }));
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME: return <Home setPage={setCurrentPage} />;
      case Page.DASHBOARD: return <Dashboard />;
      case Page.TRACKER: return <Tracker stats={stats} logs={logs} onLogAction={handleLogAction} />;
      case Page.EDUCATION: return <Education />;
      case Page.COMMUNITY: return <Community />;
      case Page.ASSISTANT: return <AiAssistant userStats={stats} />;
      case Page.MISSIONS: return <Missions onCompleteMission={handleAddXpOnly} />;
      default: return <Home setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f0fdf4] text-neo-black selection:bg-neo-pink selection:text-white pb-8">
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />
      <main className="max-w-7xl mx-auto px-4 md:px-6">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;