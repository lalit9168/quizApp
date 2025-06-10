import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quiz,
  Trash2,
  Eye,
  Download,
  LogOut,
  FileText,
  TrendingUp,
  CheckCircle,
  Play,
  User,
  Star,
  Trophy,
  Users,
  Target,
  Clock,
  Award
} from "lucide-react";

function QuizDash() {
  const [quizzes, setQuizzes] = useState([
    {
      _id: "1",
      title: "JavaScript Fundamentals",
      quizCode: "JS001",
      questions: new Array(10).fill({}),
      createdAt: "2024-06-01",
      difficulty: "Beginner"
    },
    {
      _id: "2",
      title: "React Advanced Concepts",
      quizCode: "REACT002",
      questions: new Array(15).fill({}),
      createdAt: "2024-06-05",
      difficulty: "Advanced"
    },
    {
      _id: "3",
      title: "CSS Grid & Flexbox",
      quizCode: "CSS003",
      questions: new Array(8).fill({}),
      createdAt: "2024-06-08",
      difficulty: "Intermediate"
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [submissionsData, setSubmissionsData] = useState([]);
  const [singleQuizView, setSingleQuizView] = useState(null);
  const [attemptedData, setAttemptedData] = useState([]);
  const [userEmail, setUserEmail] = useState("user@example.com");
  const [showStats, setShowStats] = useState(false);

  // Demo data
  const demoSubmissions = [
    {
      quizCode: "JS001",
      title: "JavaScript Fundamentals",
      submissions: [
        { email