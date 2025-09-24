export function ProfileHeader() {
  return (
    <div className="gaming-border gaming-glow bg-card rounded-lg">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 ring-2 ring-purple-500/50 rounded-full overflow-hidden bg-purple-600 flex items-center justify-center">
            <img src="/diverse-user-avatars.png" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-semibold text-foreground">mayankthawani</h1>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
            <p className="text-muted-foreground">mayankthawani</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-muted-foreground">
            Rank <span className="text-foreground font-semibold">17,15,407</span>
          </p>
        </div>

        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25 px-4 py-2 rounded-md transition-colors duration-200">
          Edit Profile
        </button>
      </div>
    </div>
  )
}
