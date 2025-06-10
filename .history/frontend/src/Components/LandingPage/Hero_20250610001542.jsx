import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { 
  Trophy, 
  Users, 
  BookOpen, 
  Target,
  Star,
  TrendingUp,
  Clock,
  Award,
  Brain,
  Zap
} from "lucide-react";

const Hero = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [activeChart, setActiveChart] = useState(0);

  const stats = [
    { number: "50K+", label: "Active Users", icon: Users },
    { number: "10K+", label: "Quizzes Created", icon: BookOpen },
    { number: "95%", label: "Success Rate", icon: TrendingUp },
    { number: "4.9", label: "User Rating", icon: Star }
  ];

  const features = [
    {
      icon: Brain,
      title: "Smart Quiz Engine",
      description: "AI-powered questions that adapt to your learning pace with instant feedback",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      icon: Trophy,
      title: "Global Leaderboards",
      description: "Compete with learners worldwide and earn achievements for your progress",
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      icon: Target,
      title: "Detailed Analytics",
      description: "Track your performance with comprehensive reports and progress insights",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      icon: Clock,
      title: "Timed Challenges",
      description: "Test your speed with time-based quizzes and improve your quick thinking",
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  // Quiz performance data for pie chart
  const performanceData = [
    { name: 'Excellent (90-100%)', value: 35, color: '#10b981' },
    { name: 'Good (80-89%)', value: 40, color: '#6366f1' },
    { name: 'Average (70-79%)', value: 20, color: '#f59e0b' },
    { name: 'Needs Improvement', value: 5, color: '#ef4444' }
  ];

  // Subject popularity data
  const subjectData = [
    { name: 'Science', value: 85, color: '#8b5cf6' },
    { name: 'Math', value: 78, color: '#06b6d4' },
    { name: 'History', value: 65, color: '#f59e0b' },
    { name: 'Language', value: 72, color: '#10b981' },
    { name: 'Tech', value: 90, color: '#6366f1' }
  ];

  const chartData = [performanceData, subjectData];
  const chartTitles = ['User Performance Distribution', 'Popular Quiz Categories'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const chartInterval = setInterval(() => {
      setActiveChart((prev) => (prev + 1) % chartData.length);
    }, 5000);
    return () => clearInterval(chartInterval);
  }, []);

  const FloatingShape = ({ className, delay = 0, children }) => (
    <div 
      className={`absolute opacity-20 ${className}`}
      style={{
        animation: `float 8s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    >
      {children}
    </div>
  );

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }
        .animate-slide-in-left { animation: slideInLeft 0.8s ease-out; }
        .animate-slide-in-right { animation: slideInRight 0.8s ease-out 0.2s both; }
      `}</style>

      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 overflow-hidden pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating shapes */}
          <FloatingShape className="w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full top-20 left-20" delay={0} />
          <FloatingShape className="w-20 h-20 bg-gradient-to-br from-emerald-200 to-cyan-