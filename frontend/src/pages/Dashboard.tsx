import DashboardLayout from '@/components/DashboardLayout';
import '../pages/style/style.css'
import { LogOut } from 'lucide-react';
import RecentInterviewReports from '@/components/RecentInterviewReports';
import { useEffect, useState } from 'react';
import type { Reports } from '@/types/dashboard.type';
import { getAllInterveiwReports } from '@/api/interview.api';
import { logout } from '@/api/auth.api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [reports, setReports] = useState<Reports[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getReports() {
      try {
        const res = await getAllInterveiwReports();
        setReports(res.interviewReports);
      } catch (error) {
        console.log(error);
      }
    }
    getReports();
  }, []);

  async function handleLogout() {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div className="relative max-w-5xl mx-auto px-6 py-10 space-y-10">
        {/* Logout Action btn */}
        <button
          onClick={handleLogout}
          className="absolute right-0 p-2 mt-0.5 rounded-full bg-indigo-500 text-white cursor-pointer shadow-md transition-all duration-200 hover:bg-indigo-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          title="Profile / Logout"
        >
          <LogOut className='h-5 w-5' />
        </button>

        {/* Heading */}
        <div className="space-y-5 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-200/80">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span>
              <span className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
                AI-Powered Interview Preparation
              </span>
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Create Your{" "}
            </span>
            <br className="hidden md:block" />
            <span className="relative">
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                Personalized Interview Plan
              </span>
            </span>
          </h1>

          {/* Description with enhanced styling */}
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Upload your resume, describe your experience, and paste the job
            description. Our{" "}
            <span className="text-indigo-600 font-semibold relative group">
              advanced AI
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </span>{" "}
            will analyze your profile and generate a comprehensive interview preparation
            report including{" "}
            <span className="text-transparent bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text font-semibold">
              match score, technical questions, behavioral questions,
            </span>{" "}
            and a{" "}
            <span className="text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text font-semibold">
              focused preparation plan
            </span>.
          </p>
        </div>

        {/* Dashboard Layout */}
        <DashboardLayout />

        {/* Recent or previous interview reports */}
        <RecentInterviewReports interviewReports={reports} />
      </div>
    </div>
  );
}