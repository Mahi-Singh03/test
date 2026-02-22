export default function DummyPage({ 
  title, 
  params = {}, 
  children,
  backLink 
}) {
  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-[var(--card)] rounded-[20px] dark:rounded-[24px] shadow-[var(--shadow-glass)] dark:shadow-[var(--shadow-glass-dark)] p-6 transition-all duration-300">
          <div className="flex flex-col gap-4">
              {/* Back Link */}
              {backLink && (
                <a 
                  href={backLink}
                  className="inline-flex items-center text-[var(--text-secondary)] hover:text-[var(--accent)] dark:hover:text-[var(--dark-accent)] text-sm font-medium transition-colors duration-300"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                  Back
                </a>
              )}
              
              <h1 className="text-3xl font-bold text-[var(--text-primary)] dark:text-[var(--dark-text-primary)] tracking-tight">{title}</h1>
          </div>
          
          {/* Route Params Display */}
          {Object.keys(params).length > 0 && (
            <div className="mt-6 bg-[var(--accent)]/5 dark:bg-[var(--dark-accent)]/10 border border-[var(--accent)]/10 dark:border-[var(--dark-accent)]/20 rounded-xl p-4">
              <h2 className="text-sm font-semibold text-[var(--accent)] dark:text-[var(--dark-accent)] mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Route Parameters
              </h2>
              <div className="grid gap-2">
                {Object.entries(params).map(([key, value]) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:items-center text-sm gap-1 sm:gap-2">
                    <span className="font-medium text-[var(--text-secondary)] dark:text-[var(--dark-text-secondary)] min-w-[100px]">{key}:</span>
                    <code className="font-mono bg-white dark:bg-black/20 px-2 py-0.5 rounded text-[var(--foreground)] dark:text-[var(--dark-foreground)] border border-[var(--border)] dark:border-[var(--dark-border)]">{value}</code>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="bg-[var(--card)] rounded-[20px] dark:rounded-[24px] shadow-[var(--shadow-glass)] dark:shadow-[var(--shadow-glass-dark)] p-6 transition-all duration-300">
          {children}
        </div>
      </div>
    </div>
  );
}
