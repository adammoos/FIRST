import React from 'react';
import { ArrowLeft, Calendar, TrendingUp, Activity } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine 
} from 'recharts';

interface MoodTrackerPageProps {
  onBack: () => void;
}

const hourlyStressData = [
  { time: '8AM', level: 2 },
  { time: '10AM', level: 4 },
  { time: '12PM', level: 6 },
  { time: '2PM', level: 5 },
  { time: '4PM', level: 7 },
  { time: '6PM', level: 3 },
  { time: '8PM', level: 2 },
];

const dailyStressData = [
  { day: 'Mon', stress: 4, mood: 3 },
  { day: 'Tue', stress: 6, mood: 2 },
  { day: 'Wed', stress: 3, mood: 4 },
  { day: 'Thu', stress: 7, mood: 2 },
  { day: 'Fri', stress: 5, mood: 3 },
  { day: 'Sat', stress: 2, mood: 5 },
  { day: 'Sun', stress: 1, mood: 5 },
];

const histogramData = [
  { range: 'Low', count: 12 },
  { range: 'Med', count: 8 },
  { range: 'High', count: 4 },
  { range: 'Critical', count: 1 },
];

export function MoodTrackerPage({ onBack }: MoodTrackerPageProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onBack}
          className="hover:bg-teal-50 text-slate-600 hover:text-teal-600 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Stress & Mood Analytics</h1>
          <p className="text-slate-500">Detailed insights into your wellbeing patterns</p>
        </div>
      </div>

      {/* Top Row: Current Status */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white border-none shadow-lg shadow-teal-500/20">
            <CardContent className="p-6 flex flex-col justify-between h-full">
                <div>
                    <p className="text-teal-100 font-medium mb-1">Current Mood</p>
                    <h2 className="text-3xl font-bold">Feeling Calm</h2>
                </div>
                <div className="flex items-end justify-between mt-4">
                    <span className="text-6xl">😌</span>
                    <Badge className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm">Updated 2m ago</Badge>
                </div>
            </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-6 flex flex-col justify-between h-full">
                <div>
                    <p className="text-slate-500 font-medium mb-1 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-orange-500" />
                        Current Stress Level
                    </p>
                    <h2 className="text-3xl font-bold text-slate-800">Low (3/10)</h2>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 mt-4 overflow-hidden">
                    <div className="bg-teal-500 w-[30%] h-full rounded-full" />
                </div>
            </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-6 flex flex-col justify-between h-full">
                <div>
                    <p className="text-slate-500 font-medium mb-1 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-500" />
                         Weekly Trend
                    </p>
                    <h2 className="text-3xl font-bold text-slate-800">-12% Stress</h2>
                </div>
                <p className="text-sm text-slate-400 mt-2">You're doing better than last week! Keep up the mindfulness exercises.</p>
            </CardContent>
        </Card>
      </div>

      {/* Main Charts Area */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Timeline Chart */}
        <Card className="border-none shadow-sm bg-white lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-500" />
                Stress Timeline (Last 24 Hours)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyStressData}>
                <defs>
                  <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <ReferenceLine y={5} stroke="#cbd5e1" strokeDasharray="3 3" label={{ position: 'right',  value: 'Baseline', fill: '#94a3b8', fontSize: 12 }} />
                <Area type="monotone" dataKey="level" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorStress)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Correlation Chart */}
        <Card className="border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800">User Mood vs. Stress</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyStressData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dy={10} />
                <YAxis hide />
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line type="monotone" dataKey="stress" stroke="#f43f5e" strokeWidth={2} dot={{r: 4}} name="Stress" />
                <Line type="monotone" dataKey="mood" stroke="#2DD4BF" strokeWidth={2} dot={{r: 4}} name="Mood" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <span className="text-xs text-slate-500">Stress</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                    <span className="text-xs text-slate-500">Mood</span>
                </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Stress Histogram */}
        <Card className="border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800">Stress Distribution (This Month)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={histogramData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="range" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 14, fontWeight: 500}} width={60} />
                <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="count" fill="#2DD4BF" radius={[0, 4, 4, 0]} barSize={32}>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
