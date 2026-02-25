import PageShell from '@/components/layout/PageShell';
import SelectionGrid from '@/components/ui/SelectionGrid';
import { getTopics, getMeta } from '@/lib/quizData';

export default async function TopicsPage({ params }) {
    const { paperId, subjectId, categoryId } = await params;

    const topics = getTopics(paperId, subjectId, categoryId);
    const categoryMeta = getMeta(paperId, subjectId, categoryId);
    const categoryLabel = categoryMeta?.label || categoryId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const subjectMeta = getMeta(paperId, subjectId);
    const subjectLabel = subjectMeta?.label || subjectId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    const items = topics.map((topic) => ({
        href: `/mini-quiz/${paperId}/${subjectId}/${categoryId}/${topic.id}`,
        label: topic.label,
        description: topic.description,
        icon: topic.icon,
    }));

    return (
        <PageShell
            title={categoryLabel}
            subtitle={`${subjectLabel} · Select Topic`}
            backLink={`/mini-quiz/${paperId}/${subjectId}`}
            backLabel={subjectLabel}
        >
            {items.length > 0 ? (
                <SelectionGrid items={items} />
            ) : (
                <EmptyState message={`Add a topic folder inside data/mini-quiz/${paperId}/${subjectId}/${categoryId}/.`} />
            )}
        </PageShell>
    );
}

function EmptyState({ message }) {
    return (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-2)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📭</div>
            <p style={{ fontWeight: 600, color: 'var(--text-1)', marginBottom: '0.5rem' }}>No topics yet</p>
            <p style={{ fontSize: '0.875rem', maxWidth: 340, margin: '0 auto' }}>{message}</p>
        </div>
    );
}
