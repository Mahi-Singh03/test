import PageShell from '@/components/layout/PageShell';
import SelectionGrid from '@/components/ui/SelectionGrid';

const papers = [
    {
        href: '/mini-quiz/paper-1',
        label: 'Paper 1',
        description: 'General Awareness · Quantitative Aptitude · Punjabi',
        icon: '📘',
        badge: '3 Subjects',
    },
    {
        href: '/mini-quiz/paper-2',
        label: 'Paper 2',
        description: 'Logical Reasoning · Digital Literacy · English',
        icon: '📗',
        badge: '3 Subjects',
    },
];

export default function MiniQuizPage() {
    return (
        <PageShell
            title="Mini Quiz"
            subtitle="Topic-wise Practice"
            backLink="/"
            backLabel="Home"
        >
            {/* Info banner */}
            <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                background: 'rgba(124,58,237,0.06)',
                border: '1px solid rgba(124,58,237,0.15)',
                borderRadius: '14px',
                padding: '1rem 1.25rem',
                marginBottom: '1.5rem',
            }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-2)', lineHeight: 1.5 }}>
                    Pick a paper, then narrow down to your subject, category, and topic for focused quiz practice.
                </p>
            </div>

            <SelectionGrid items={papers} />
        </PageShell>
    );
}
