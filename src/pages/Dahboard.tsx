import { ProfileHeader } from "./components/dashboard/profile-header"

import { Languages } from "./components/dashboard/languages"
import { ProblemStats } from "./components/dashboard/problem-stats"
import { BadgeSection } from "./components/dashboard/badge-section"
import { ActivityHeatmap } from "./components/dashboard/activity-heatmap"
import { RecentActivity } from "./components/dashboard/recent-activity"
import { DashboardNav } from "./components/dashboard/dashboard-nav"
import AnimatedBackground from './components/AnimatedBackground'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <AnimatedBackground />
      <DashboardNav />
      
      {/* Main Content */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 shadow-lg hover:border-gray-700 transition-colors">
                <ProfileHeader />
              </div>
              
             
              
              <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 shadow-lg hover:border-gray-700 transition-colors">
                <Languages />
              </div>
            </div>

            {/* Middle & Right Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 shadow-lg hover:border-gray-700 transition-colors">
                  <ProblemStats />
                </div>
                <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 shadow-lg hover:border-gray-700 transition-colors">
                  <BadgeSection />
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 shadow-lg hover:border-gray-700 transition-colors">
                <ActivityHeatmap />
              </div>

              <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 shadow-lg hover:border-gray-700 transition-colors">
                <RecentActivity />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
