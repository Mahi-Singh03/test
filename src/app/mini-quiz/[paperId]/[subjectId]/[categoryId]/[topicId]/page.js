import PageShell from '@/components/layout/PageShell';
import SelectionGrid from '@/components/ui/SelectionGrid';

export default async function QuizSetsPage({ params }) {
    const resolvedParams = await params;

    const quizSets = [
        {
            href: `/mini-quiz/${resolvedParams.paperId}/${resolvedParams.subjectId}/${resolvedParams.categoryId}/${resolvedParams.topicId}/set-1`,
            label: 'Quiz Set 1',
            description: '20 questions · ~15 min',
            icon: '📝',
            badge: 'Set 1',
        },
        {
            href: `/mini-quiz/${resolvedParams.paperId}/${resolvedParams.subjectId}/${resolvedParams.categoryId}/${resolvedParams.topicId}/set-2`,
            label: 'Quiz Set 2',
            description: '20 questions · ~15 min',
            icon: '📋',
            badge: 'Set 2',
        },
    ];

    return (
        <PageShell
            title="Select Quiz Set"
            subtitle="Choose a set to begin"
            backLink={`/mini-quiz/${resolvedParams.paperId}/${resolvedParams.subjectId}/${resolvedParams.categoryId}`}
            backLabel="Categories"
        >
            <SelectionGrid items={quizSets} />
        </PageShell>
    );
}
