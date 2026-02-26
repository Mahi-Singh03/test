import PageShell from '@/components/layout/PageShell';
import SelectionGrid from '@/components/ui/SelectionGrid';

const papers = [
    {
        href: '/full-paper/paper-1',
        label: 'Paper 1',
        description: 'General Awareness · Quantitative Aptitude · Punjabi',
        icon: '📘',
        badge: '3 Subjects',
    },
    {
        href: '/full-paper/paper-2',
        label: 'Paper 2',
        description: 'Logical Reasoning · Digital Literacy · English',
        icon: '📗',
        badge: '3 Subjects',
    },

];

export default function FullPaperPage() {
    return (
        <PageShell
            title="Full Question Papers"
            subtitle="Choose a paper"
            backLink="/"
            backLabel="Home"
        >
            {/* Info banner */}
            <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                background: 'var(--accent-soft)',
                border: '1px solid rgba(21,101,192,0.15)',
                borderRadius: '14px',
                padding: '1rem 1.25rem',
                marginBottom: '1.5rem',
            }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}>
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-2)', lineHeight: 1.5 }}>
                    Select a paper below. You&apos;ll then choose the year and available paper to attempt.
                </p>
            </div>

            <SelectionGrid items={papers} />
        </PageShell>
    );
}
