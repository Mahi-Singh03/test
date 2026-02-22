import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';

export default async function MiniQuizGamePage({ params }) {
    const resolvedParams = await params;
    const setLabel = resolvedParams.quizSetId
        ? resolvedParams.quizSetId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        : 'Quiz Set';

    return (
        <PageShell
            title={setLabel}
            subtitle="Mini Quiz"
            backLink={`/mini-quiz/${resolvedParams.paperId}/${resolvedParams.subjectId}/${resolvedParams.categoryId}/${resolvedParams.topicId}`}
            backLabel="Quiz Sets"
        >
            {/* Coming soon card */}
            <div style={{
                textAlign: 'center',
                padding: '3rem 1.5rem',
            }} className="card">
                <div style={{ fontSize: '3rem', marginBottom: '1.25rem' }}>🎯</div>
                <h2 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text-1)',
                    marginBottom: '0.75rem',
                    letterSpacing: '-0.01em',
                }}>
                    Quiz Engine Coming Soon
                </h2>
                <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-2)',
                    maxWidth: '340px',
                    margin: '0 auto 2rem',
                    lineHeight: 1.6,
                }}>
                    The <strong>{setLabel}</strong> questions will load here once the quiz engine is connected.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link
                        href={`/results/mini-${resolvedParams.quizSetId}-preview`}
                        className="btn-primary"
                    >
                        Preview Results
                    </Link>
                    <Link href="/" className="btn-secondary">
                        Back to Home
                    </Link>
                </div>
            </div>
        </PageShell>
    );
}
