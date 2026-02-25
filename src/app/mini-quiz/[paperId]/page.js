import PageShell from '@/components/layout/PageShell';
import SelectionGrid from '@/components/ui/SelectionGrid';
import { getSubjects, getMeta } from '@/lib/quizData';

export default async function MiniQuizSubjectsPage({ params }) {
    const { paperId } = await params;

    const subjects = getSubjects(paperId);
    const paperMeta = getMeta(paperId);
    const paperLabel = paperMeta?.label || paperId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    const items = subjects.map((s) => ({
        href: `/mini-quiz/${paperId}/${s.id}`,
        label: s.label,
        description: s.description,
        icon: s.icon,
    }));

    return (
        <PageShell
            title="Select Subject"
            subtitle={paperLabel}
            backLink="/mini-quiz"
            backLabel="Mini Quiz"
        >
            {items.length > 0 ? (
                <SelectionGrid items={items} />
            ) : (
                <EmptyState message="No subjects found. Add a subject folder inside data/mini-quiz/{paperId}/." />
            )}
        </PageShell>
    );
}

function EmptyState({ message }) {
    return (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-2)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📭</div>
            <p style={{ fontWeight: 600, color: 'var(--text-1)', marginBottom: '0.5rem' }}>Nothing here yet</p>
            <p style={{ fontSize: '0.875rem', maxWidth: 340, margin: '0 auto' }}>{message}</p>
        </div>
    );
}
