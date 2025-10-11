

import { useEffect, useState } from "react"

export function BadgeSection() {
  const [currentStreak, setCurrentStreak] = useState(50)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    // Check if we need to update the streak (once per day)
    const today = new Date().toDateString()
    const lastUpdate = localStorage.getItem("lastStreakUpdate")

    if (lastUpdate !== today) {
      // Update streak for new day
      const savedStreak = localStorage.getItem("currentStreak")
      const newStreak = savedStreak ? Number.parseInt(savedStreak) + 1 : 50

      setCurrentStreak(newStreak)
      localStorage.setItem("currentStreak", newStreak.toString())
      localStorage.setItem("lastStreakUpdate", today)
      setLastUpdated(new Date())
    } else {
      // Load existing streak
      const savedStreak = localStorage.getItem("currentStreak")
      if (savedStreak) {
        setCurrentStreak(Number.parseInt(savedStreak))
      }
    }
  }, [])

  return (
    <div className="gaming-border gaming-glow bg-card rounded-lg">
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-foreground font-semibold">Badges</h3>
          <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      <div className="px-4 pb-4 space-y-4">
        <div className="text-3xl font-bold text-foreground">1</div>

        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/25">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Most Recent Badge</div>
            <div className="font-semibold text-foreground">{currentStreak} Days Badge 2025</div>
            {lastUpdated && <div className="text-xs text-purple-400">Updated today! 🎉</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
