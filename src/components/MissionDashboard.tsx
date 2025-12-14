import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Send, User, Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const data = [
  { name: 'Mon', value: 1.5 },
  { name: 'Tue', value: 2.2 },
  { name: 'Wed', value: 2.8 },
  { name: 'Thu', value: 3.5 },
  { name: 'Fri', value: 2.8 },
  { name: 'Sat', value: 3.8 },
  { name: 'Sun', value: 4.2 },
];

export function MissionDashboard() {
  return (
    <div className="grid lg:grid-cols-3 gap-8 mt-12">
      {/* Left Column: Stress Tracker Visualization (Span 2) */}
      <div className="lg:col-span-2 space-y-8">
        <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-bold text-slate-800">Track Your Mood</CardTitle>
                    <Badge variant="secondary" className="bg-teal-50 text-teal-600 hover:bg-teal-100">Mission: Stress Timeline</Badge>
                </div>
                <p className="text-slate-500">Visualizing user stress levels over time</p>
            </CardHeader>
            <CardContent className="h-[300px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0}/>
                    </linearGradient>
                    </defs>
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8' }} 
                        dy={10}
                    />
                    <YAxis 
                        hide={true} 
                        domain={[0, 5]}
                    />
                    <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#2DD4BF" 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                    />
                </AreaChart>
                </ResponsiveContainer>
            </CardContent>
            
            <div className="px-6 pb-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">How are you feeling today?</h3>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                        <span role="img" aria-label="happy">😊</span>
                    </div>
                    <div className="h-3 flex-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-teal-400 rounded-full"></div>
                    </div>
                </div>
            </div>
        </Card>
      </div>

      {/* Right Column: Chatbot Visualization */}
      <div className="lg:col-span-1">
        <Card className="border-none shadow-xl shadow-teal-900/5 bg-teal-50/50 h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-300 to-teal-100"></div>
            <CardHeader className="bg-white/80 backdrop-blur-sm border-b border-teal-100/50 pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-slate-800">Chat with our bot</CardTitle>
                    <Badge variant="outline" className="text-xs border-teal-200 text-teal-600 bg-teal-50">Crewbot Mission</Badge>
                </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
                {/* Bot Message */}
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-teal-100 shrink-0">
                        <Bot className="w-4 h-4 text-teal-500" />
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-slate-600 border border-teal-50/50">
                        Hi, I'm here to support you.
                    </div>
                </div>

                {/* User Message */}
                <div className="flex gap-3 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center shrink-0 text-white">
                        <User className="w-4 h-4" />
                    </div>
                    <div className="bg-teal-500 text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-sm">
                        I'm feeling overwhelmed.
                    </div>
                </div>

                {/* Bot Message */}
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-teal-100 shrink-0">
                        <Bot className="w-4 h-4 text-teal-500" />
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-slate-600 border border-teal-50/50">
                        I'm sorry to hear that. Would you like to play a relaxing game or try a breathing exercise?
                    </div>
                </div>
            </CardContent>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-teal-100/50">
                <div className="relative">
                    <Input 
                        placeholder="Type a message..." 
                        className="pr-10 border-slate-200 bg-white focus-visible:ring-teal-400"
                    />
                    <Button 
                        size="icon" 
                        className="absolute right-1 top-1 h-8 w-8 bg-transparent hover:bg-teal-50 text-teal-500 shadow-none"
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </Card>
      </div>
    </div>
  );
}
