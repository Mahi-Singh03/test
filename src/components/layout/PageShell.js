import Link from 'next/link';

export default function PageShell({ title, subtitle, backLink, backLabel = 'Back', children }) {
    return (
        <div style={{
            width: '100%',
            minHeight: '100dvh',
            padding: '1.75rem 1rem 3rem',
        }}>
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>

                {/* Back navigation */}
                {backLink && (
                    <div className="animate-fade-up" style={{ marginBottom: '1.25rem' }}>
                        <Link href={backLink} className="btn-ghost">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5M12 5l-7 7 7 7" />
                            </svg>
                            {backLabel}
                        </Link>
                    </div>
                )}

                {/* Page Header */}
                <div className="animate-fade-up" style={{ marginBottom: '1.75rem', animationDelay: '0.05s' }}>
                    {subtitle && (
                        <p style={{
                            fontSize: '0.8125rem',
                            fontWeight: 600,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            color: 'var(--accent)',
                            marginBottom: '0.4rem',
                        }}>
                            {subtitle}
                        </p>
                    )}
                    <h1 style={{
                        fontSize: 'clamp(1.5rem, 5vw, 2rem)',
                        fontWeight: 800,
                        color: 'var(--text-1)',
                        lineHeight: 1.2,
                        letterSpacing: '-0.02em',
                    }}>
                        {title}
                    </h1>
                </div>

                {/* Content */}
                <div className="animate-fade-up" style={{ animationDelay: '0.10s' }}>
                    {children}
                </div>

            </div>
        </div>
    );
}
