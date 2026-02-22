import Link from 'next/link';

export default async function ResultsPage({ params }) {
    const resolvedParams = await params;

    const results = {
        score: 85,
        totalQuestions: 100,
        correct: 85,
        incorrect: 10,
        unattempted: 5,
        timeTaken: '45 min',
        percentage: 85,
    };

    const grade = results.percentage >= 80 ? { label: 'Excellent', color: '#16a34a', bg: 'rgba(22,163,74,0.08)' }
        : results.percentage >= 60 ? { label: 'Good', color: '#d97706', bg: 'rgba(217,119,6,0.08)' }
            : { label: 'Keep Practicing', color: '#dc2626', bg: 'rgba(220,38,38,0.08)' };

    return (
        <div className="page-wrapper" style={{ maxWidth: '600px', margin: '0 auto' }}>

            {/* Score hero */}
            <div
                className="card animate-fade-up"
                style={{ padding: '2.5rem 1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}
            >
                {/* Trophy */}
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>

                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: grade.bg,
                    color: grade.color,
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    padding: '0.35rem 0.875rem',
                    borderRadius: '999px',
                    marginBottom: '1.25rem',
                }}>
                    {grade.label}
                </div>

                <div style={{
                    fontSize: 'clamp(3.5rem, 15vw, 5rem)',
                    fontWeight: 900,
                    color: grade.color,
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    marginBottom: '0.375rem',
                }}>
                    {results.percentage}%
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-2)' }}>
                    {results.correct} of {results.totalQuestions} questions correct
                </p>
            </div>

            {/* Stats grid */}
            <div
                className="card animate-fade-up stagger-1"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    marginBottom: '1.25rem',
                    overflow: 'hidden',
                }}
            >
                {[
                    { label: 'Correct', value: results.correct, color: '#16a34a', icon: '✓' },
                    { label: 'Incorrect', value: results.incorrect, color: '#dc2626', icon: '✗' },
                    { label: 'Unattempted', value: results.unattempted, color: 'var(--text-2)', icon: '–' },
                    { label: 'Time Taken', value: results.timeTaken, color: '#1565C0', icon: '⏱' },
                ].map((stat, idx) => (
                    <div key={stat.label} style={{
                        padding: '1.25rem',
                        borderRight: idx % 2 === 0 ? '1px solid var(--border)' : 'none',
                        borderBottom: idx < 2 ? '1px solid var(--border)' : 'none',
                        textAlign: 'center',
                    }}>
                        <div style={{
                            fontSize: '1.625rem',
                            fontWeight: 800,
                            color: stat.color,
                            letterSpacing: '-0.02em',
                            lineHeight: 1,
                            marginBottom: '0.375rem',
                        }}>
                            {stat.value}
                        </div>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-2)', fontWeight: 500 }}>
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div
                className="animate-fade-up stagger-2"
                style={{ display: 'flex', gap: '0.75rem', flexDirection: 'column' }}
            >
                <Link href="/mini-quiz" className="btn-primary" style={{ justifyContent: 'center' }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    Try Another Quiz
                </Link>
                <Link href="/" className="btn-secondary" style={{ justifyContent: 'center' }}>
                    Back to Home
                </Link>
            </div>

        </div>
    );
}
