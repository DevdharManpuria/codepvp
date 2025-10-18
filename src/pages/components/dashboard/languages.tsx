export function Languages() {
  const languages = [
    { name: "C++", problems: 70 },
    { name: "JavaScript", problems: 25 },
    { name: "Python", problems: 15 },
  ]

  return (
    <div className="gaming-border gaming-glow bg-card rounded-lg">
      <div className="p-4">
        <h3 className="text-lg text-foreground font-semibold mb-4">Languages</h3>
      </div>
      <div className="px-4 pb-4 space-y-3">
        {languages.map((lang, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-foreground">{lang.name}</span>
            <span className="text-sm text-muted-foreground">{lang.problems} problems solved</span>
          </div>
        ))}
      </div>
    </div>
  )
}
