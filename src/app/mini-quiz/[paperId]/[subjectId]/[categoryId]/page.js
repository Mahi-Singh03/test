import PageShell from '@/components/layout/PageShell';
import SelectionGrid from '@/components/ui/SelectionGrid';
import { getQuizSets, getMeta } from '@/lib/quizData';

export default async function QuizSetsPage({ params }) {
    const { paperId, subjectId, categoryId } = await params;

    // We treat "general" as an internal topic slug that is not exposed in the URL.
    const topicId = 'general';

    const sets = getQuizSets(paperId, subjectId, categoryId, topicId);
    const categoryMeta = getMeta(paperId, subjectId, categoryId);
    const categoryLabel = categoryMeta?.label || categoryId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const subjectMeta = getMeta(paperId, subjectId);
    const subjectLabel = subjectMeta?.label || subjectId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const topicMeta = getMeta(paperId, subjectId, categoryId, topicId);
    const topicLabel = topicMeta?.label || topicId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    const items = sets.map((s) => ({
        href: `/mini-quiz/${paperId}/${subjectId}/${categoryId}/${s.id}`,
        label: s.label,
        description: s.questions
            ? `${s.questions} questions · ${s.duration} min`
            : s.description,
        icon: s.icon,
        badge: s.label,
    }));

    return (
        <PageShell
            title={`${categoryLabel} — ${topicLabel}`}
            subtitle="Select a Quiz Set to Begin"
            backLink={`/mini-quiz/${paperId}/${subjectId}`}
            backLabel={subjectLabel}
        >
            {items.length > 0 ? (
                <SelectionGrid items={items} />
            ) : (
                <EmptyState
                    message={`Drop a JSON file (e.g. set-1.json) into data/mini-quiz/${paperId}/${subjectId}/${categoryId}/${topicId}/ to add a quiz set.`}
                />
            )}
        </PageShell>
    );
}

function EmptyState({ message }) {
    return (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-2)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📭</div>
            <p style={{ fontWeight: 600, color: 'var(--text-1)', marginBottom: '0.5rem' }}>No quiz sets yet</p>
            <p style={{ fontSize: '0.875rem', maxWidth: 360, margin: '0 auto', lineHeight: 1.6 }}>{message}</p>
        </div>
    );
}
