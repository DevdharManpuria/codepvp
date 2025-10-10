

import { useState, useEffect } from "react"

export function ActivityHeatmap() {
  const [activityData, setActivityData] = useState<{ [key: string]: number[] }>({})

  useEffect(() => {
    const months = [
      { name: "Jan", days: 31 },
      { name: "Feb", days: 28 }, // Simplified, not handling leap years
      { name: "Mar", days: 31 },
      { name: "Apr", days: 30 },
      { name: "May", days: 31 },
      { name: "Jun", days: 30 },
      { name: "Jul", days: 31 },
      { name: "Aug", days: 31 },
      { name: "Sep", days: 30 },
      { name: "October", days: 31 },
      { name: "November", days: 30 },
      { name: "December", days: 31 }
    ]

    const data: { [key: string]: number[] } = {}

    months.forEach((month, monthIndex) => {
      const monthData: number[] = []

    
      const currentDate = new Date()
      const currentDay = currentDate.getDate()

      const daysToShow = monthIndex === 8 ? Math.min(currentDay, month.days) : month.days

      for (let day = 1; day <= daysToShow; day++) {
        // Generate realistic activity pattern - more activity on weekdays
        const dayOfWeek = new Date(2024, monthIndex, day).getDay()
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

        let activity = 0
        if (Math.random() > (isWeekend ? 0.8 : 0.4)) {
          activity = Math.floor(Math.random() * 5)
        }

        monthData.push(activity)
      }

      data[month.name] = monthData
    })

    setActivityData(data)
  }, [])

  const getActivityColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-gray-800/50"
      case 1:
        return "bg-cyan-900/70"
      case 2:
        return "bg-cyan-700/80"
      case 3:
        return "bg-cyan-500/90"
      case 4:
        return "bg-cyan-400"
      default:
        return "bg-gray-800/50"
    }
  }

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Coding Activity
        </h3>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
            Active days: 64
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
            Max streak: 17
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-6">
          {monthNames.map((month) => (
            <div key={month} className="flex flex-col items-center space-y-2">
              <span className="text-xs text-gray-400 font-medium">{month}</span>
              <div className="grid grid-cols-7 gap-1">
                {activityData[month]?.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`w-3 h-3 rounded-sm ${getActivityColor(day)} border border-gray-700/30 
                    hover:border-cyan-400/50 transition-all duration-300 cursor-pointer
                    hover:shadow-[0_0_8px_rgba(6,182,212,0.3)]`}
                    title={`${month} ${dayIndex + 1}: ${day} submissions`}
                  />
                ))}
                {/* Fill empty slots for incomplete weeks */}
                {activityData[month] &&
                  Array.from({
                    length: Math.max(0, 7 - (activityData[month].length % 7)),
                  }).map((_, emptyIndex) => <div key={`empty-${emptyIndex}`} className="w-3 h-3" />)}
              </div>
            </div>
          ))}
        </div>

        {/* Activity level legend */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <span className="text-xs text-gray-400">Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${getActivityColor(level)} border border-gray-700/30`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">More</span>
        </div>
      </div>
    </div>
  )
}
