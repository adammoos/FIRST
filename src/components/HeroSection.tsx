import React from 'react';
import { PlayCircle, Smile, MessageCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface HeroSectionProps {
  onNavigateToTracker: () => void;
  onNavigateToGame: () => void;
}

export function HeroSection({ onNavigateToTracker, onNavigateToGame }: HeroSectionProps) {
  return (
    <div className="space-y-16 py-12 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <p className="text-teal-600 font-medium tracking-wide uppercase text-sm">Mental Health Hackathon</p>
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
          A calm space for <br/> your mind
        </h1>
        <p className="text-xl text-slate-500 font-light">
          Relax. Reflect. Reset. <span className="text-teal-500 font-medium">(And Code)</span>.
        </p>
      </div>

      {/* Action Cards / Mission Categories */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Card 1: Game - UPDATED CLICK HANDLER */}
        <Card 
          onClick={onNavigateToGame}
          className="border-none shadow-sm hover:shadow-md transition-all hover:scale-[1.02] bg-white group cursor-pointer h-full ring-2 ring-transparent hover:ring-teal-100"
        >
          <CardContent className="p-8 flex flex-col items-start gap-4 h-full">
            <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
              <PlayCircle className="w-6 h-6 text-teal-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Play a Relaxing Game</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Mission: Build a mini interactive experience (e.g., guided breathing, simple pattern task) that provides quick relaxation.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Mood */}
        <Card 
          onClick={onNavigateToTracker}
          className="border-none shadow-sm hover:shadow-md transition-all hover:scale-[1.02] bg-white group cursor-pointer h-full ring-2 ring-transparent hover:ring-teal-100"
        >
          <CardContent className="p-8 flex flex-col items-start gap-4 h-full">
            <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
              <Smile className="w-6 h-6 text-teal-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Track Your Mood</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Mission: Build a timeline showing patterns in user stress levels. Highlight spikes or patterns over time.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Chat */}
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow bg-white group cursor-pointer h-full">
          <CardContent className="p-8 flex flex-col items-start gap-4 h-full">
            <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
              <MessageCircle className="w-6 h-6 text-teal-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Talk to Someone</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Mission: Build a conversational crewbot that interacts with users and adapts to their mood.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
