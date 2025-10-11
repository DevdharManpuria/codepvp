export function RecentActivity() {
  const tabs = [
    {
      icon: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
          <line x1="16" y1="2" x2="16" y2="6" strokeWidth={2} />
          <line x1="8" y1="2" x2="8" y2="6" strokeWidth={2} />
          <line x1="3" y1="10" x2="21" y2="10" strokeWidth={2} />
        </svg>
      ),
      label: "Recent AC",
      active: true,
    },
    {
      icon: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <line x1="8" y1="6" x2="21" y2="6" strokeWidth={2} />
          <line x1="8" y1="12" x2="21" y2="12" strokeWidth={2} />
          <line x1="8" y1="18" x2="21" y2="18" strokeWidth={2} />
          <line x1="3" y1="6" x2="3.01" y2="6" strokeWidth={2} />
          <line x1="3" y1="12" x2="3.01" y2="12" strokeWidth={2} />
          <line x1="3" y1="18" x2="3.01" y2="18" strokeWidth={2} />
        </svg>
      ),
      label: "List",
      active: false,
    },
    {
      icon: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      label: "Solutions",
      active: false,
    },
    {
      icon: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      label: "Discuss",
      active: false,
    },
  ]

  const recentSubmissions = [
    {
      title: "String to Integer (atoi)",
      timeAgo: "20 hours ago",
      status: "accepted",
    },
    {
      title: "Roman to Integer",
      timeAgo: "2 days ago",
      status: "accepted",
    },
    {
      title: "Two Sum",
      timeAgo: "3 days ago",
      status: "accepted",
    },
  ]

  return (
    <div className="gaming-border gaming-glow bg-card rounded-lg">
      <div className="p-0">
        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`flex items-center space-x-2 px-4 py-3 rounded-none border-b-2 transition-colors ${
                tab.active
                  ? "border-purple-500 bg-purple-500/10 text-purple-400"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon />
              <span>{tab.label}</span>
            </button>
          ))}
          <div className="flex-1"></div>
          <button className="px-4 py-3 text-muted-foreground hover:text-foreground transition-colors flex items-center">
            View all submissions
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Recent submissions */}
        <div className="p-6 space-y-4">
          {recentSubmissions.map((submission, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-foreground hover:text-purple-400 cursor-pointer transition-colors">
                  {submission.title}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">{submission.timeAgo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
