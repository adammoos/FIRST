import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, User, Github, Chrome } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

interface AuthPageProps {
  onBack: () => void;
  onLoginSuccess: () => void;
}

export function AuthPage({ onBack, onLoginSuccess }: AuthPageProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex animate-in fade-in duration-500">
      {/* Left Side: Branding & Visuals */}
      <div className="hidden lg:flex w-1/2 bg-[#F0F9FA] relative items-center justify-center p-12 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-50 to-teal-100/50" />
        
        {/* Abstract Shapes */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-700" />

        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Your Journey to Mental Clarity Starts Here.</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Join thousands of developers and mindful individuals who are using technology to understand, track, and improve their wellbeing.
          </p>
          
          <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-sm">
            <div className="flex gap-1 mb-3">
               {[1, 2, 3, 4, 5].map((i) => (
                 <span key={i} className="text-amber-400">★</span>
               ))}
            </div>
            <p className="text-slate-700 italic font-medium">"This platform helped me realize my stress triggers before they became burnout. Essential for any remote worker."</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">SJ</div>
              <div>
                <p className="text-sm font-bold text-slate-900">Sarah Jenkins</p>
                <p className="text-xs text-slate-500">Software Engineer @ TechCorp</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Auth Forms */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-12 lg:p-24 overflow-y-auto">
        <div className="w-full max-w-md mx-auto space-y-8">
          <Button 
            variant="ghost" 
            className="pl-0 hover:bg-transparent hover:text-teal-600 -ml-2" 
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
            <p className="text-slate-500">Enter your credentials to access your account.</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Create Account</TabsTrigger>
            </TabsList>

            {/* LOGIN FORM */}
            <TabsContent value="login">
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input id="email" placeholder="name@example.com" type="email" required className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-xs text-teal-600 hover:text-teal-700 font-medium">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input id="password" type="password" required className="pl-10" />
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white h-11" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            {/* SIGN UP FORM */}
            <TabsContent value="signup">
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" required placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" required placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input id="signup-email" placeholder="name@example.com" type="email" required className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input id="signup-password" type="password" required className="pl-10" />
                  </div>
                  <p className="text-xs text-slate-500">Must be at least 8 characters</p>
                </div>
                
                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white h-11" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-11">
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline" className="h-11">
              <Chrome className="mr-2 h-4 w-4 text-blue-500" />
              Google
            </Button>
          </div>
        </div>
        
        <div className="mt-auto pt-8 text-center text-xs text-slate-400">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
}
