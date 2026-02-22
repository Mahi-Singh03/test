import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';

const formatDate = (slug) => {
    const map = {
        'jan-15': 'January 15',
        'feb-05': 'February 05',
    };
    return map[slug] || slug;
};

const paperNames = {
    'paper-1': 'Paper 1',
    'paper-2': 'Paper 2',
    'paper-3': 'Paper 3',
};

export default async function FullPaperQuizPage({ params }) {
    const resolvedParams = await params;
    const paperName = paperNames[resolvedParams.paperId] || resolvedParams.paperId;
    const examDate = formatDate(resolvedParams.examDate);

    return (
        <PageShell
            title={`${paperName} · ${resolvedParams.year}`}
            subtitle={`Exam Date: ${examDate}`}
            backLink={`/full-paper/${resolvedParams.paperId}/${resolvedParams.year}`}
            backLabel="Exam Dates"
        >
            {/* Coming soon card */}
            <div style={{
                textAlign: 'center',
                padding: '3rem 1.5rem',
            }} className="card">
                <div style={{ fontSize: '3rem', marginBottom: '1.25rem' }}>📝</div>
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
                    The full question paper for <strong>{paperName}</strong>, {resolvedParams.year} ({examDate}) will load here.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link href={`/full-paper/${resolvedParams.paperId}/${resolvedParams.year}`} className="btn-secondary">
                        ← Change Date
                    </Link>
                    <Link href="/" className="btn-primary">
                        Back to Home
                    </Link>
                </div>
            </div>
        </PageShell>
    );
}
