import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { MissionDashboard } from './components/MissionDashboard';
import { MoodTrackerPage } from './components/MoodTrackerPage';
import { RelaxingGamePage } from './components/RelaxingGamePage';
import { AuthPage } from './components/AuthPage';
import { LogIn } from 'lucide-react';
import { Button } from "@/components/ui/button";

type Page = 'home' | 'tracker' | 'auth' | 'game';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  // If page is auth, render AuthPage fully
  if (currentPage === 'auth') {
    return <AuthPage onBack={() => setCurrentPage('home')} onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#F0F9FA] text-slate-900 font-sans selection:bg-teal-100 flex flex-col">
      {/* Top Navigation Mock */}
      <nav className="w-full max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
         <span 
           className="text-lg font-bold text-slate-800 cursor-pointer"
           onClick={() => setCurrentPage('home')}
         >
           Mindful<span className="text-teal-500">Hacks</span>
         </span>
         
         <div className="flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors hidden md:block">About</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors hidden md:block">Missions</a>
            
            {isAuthenticated ? (
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm">
                   SJ
                 </div>
               </div>
            ) : (
              <Button 
                onClick={() => setCurrentPage('auth')}
                className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}
         </div>
      </nav>

      <main className="w-full max-w-6xl mx-auto px-6 pb-20 flex-grow">
        {currentPage === 'home' ? (
          <>
            <HeroSection 
                onNavigateToTracker={() => setCurrentPage('tracker')} 
                onNavigateToGame={() => setCurrentPage('game')}
            />
            <MissionDashboard />
          </>
        ) : currentPage === 'tracker' ? (
          <MoodTrackerPage onBack={() => setCurrentPage('home')} />
        ) : (
          <RelaxingGamePage onBack={() => setCurrentPage('home')} />
        )}
      </main>
      
      <footer className="w-full bg-white/50 border-t border-slate-100 mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-slate-400 text-sm">
          <p>© 2025 Mental Health Hackathon. Inspired by calm.</p>
        </div>
      </footer>
    </div>
  );
}
