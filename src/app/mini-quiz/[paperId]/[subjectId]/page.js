import PageShell from '@/components/layout/PageShell';
import SelectionGrid from '@/components/ui/SelectionGrid';
import { getCategories } from '@/config/subjects';

const subjectLabels = {
    'general-awareness': 'General Awareness',
    'quantitative-aptitude': 'Quantitative Aptitude',
    'punjabi-language': 'Punjabi Language',
    'logical-reasoning': 'Logical Reasoning',
    'digital-literacy': 'Digital Literacy',
    'english-language': 'English Language',
};

const paperNames = {
    'paper-1': 'Paper 1',
    'paper-2': 'Paper 2',
};

export default async function CategoriesPage({ params }) {
    const resolvedParams = await params;
    const subjectLabel = subjectLabels[resolvedParams.subjectId] || resolvedParams.subjectId;
    const paperName = paperNames[resolvedParams.paperId] || resolvedParams.paperId;

    const categoriesData = getCategories(resolvedParams.paperId, resolvedParams.subjectId);

    const categories = Object.entries(categoriesData).map(([id, data]) => ({
        href: `/mini-quiz/${resolvedParams.paperId}/${resolvedParams.subjectId}/${id}`,
        label: data.name,
        description: data.description || 'Practice this category',
        icon: '📂',
    }));

    return (
        <PageShell
            title="Select Category"
            subtitle={`${paperName} · ${subjectLabel}`}
            backLink={`/mini-quiz/${resolvedParams.paperId}`}
            backLabel={paperName}
        >
            {categories.length > 0 ? (
                <SelectionGrid items={categories} />
            ) : (
                <div style={{
                    textAlign: 'center',
                    padding: '3rem 1rem',
                    color: 'var(--text-2)',
                }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📭</div>
                    <p style={{ fontWeight: 600, color: 'var(--text-1)', marginBottom: '0.5rem' }}>No categories yet</p>
                    <p style={{ fontSize: '0.875rem' }}>Check back soon — content is being added!</p>
                </div>
            )}
        </PageShell>
    );
}
