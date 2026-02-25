import PageShell from '@/components/layout/PageShell';
import SelectionGrid from '@/components/ui/SelectionGrid';
import { getCategories, getMeta } from '@/lib/quizData';

export default async function CategoriesPage({ params }) {
    const { paperId, subjectId } = await params;

    const categories = getCategories(paperId, subjectId);
    const subjectMeta = getMeta(paperId, subjectId);
    const subjectLabel = subjectMeta?.label || subjectId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const paperMeta = getMeta(paperId);
    const paperLabel = paperMeta?.label || paperId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    const items = categories.map((cat) => ({
        href: `/mini-quiz/${paperId}/${subjectId}/${cat.id}`,
        label: cat.label,
        description: cat.description,
        icon: cat.icon,
    }));

    return (
        <PageShell
            title="Select Category"
            subtitle={`${paperLabel} · ${subjectLabel}`}
            backLink={`/mini-quiz/${paperId}`}
            backLabel={paperLabel}
        >
            {items.length > 0 ? (
                <SelectionGrid items={items} />
            ) : (
                <EmptyState message={`Add a category folder inside data/mini-quiz/${paperId}/${subjectId}/.`} />
            )}
        </PageShell>
    );
}

function EmptyState({ message }) {
    return (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-2)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📭</div>
            <p style={{ fontWeight: 600, color: 'var(--text-1)', marginBottom: '0.5rem' }}>No categories yet</p>
            <p style={{ fontSize: '0.875rem', maxWidth: 340, margin: '0 auto' }}>{message}</p>
        </div>
    );
}
