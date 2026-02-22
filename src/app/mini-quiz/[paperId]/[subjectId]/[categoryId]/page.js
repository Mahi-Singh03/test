import PageShell from '@/components/layout/PageShell';
import SelectionGrid from '@/components/ui/SelectionGrid';
import { getTopics, getCategoryName } from '@/config/subjects';

const subjectLabels = {
    'general-awareness': 'General Awareness',
    'quantitative-aptitude': 'Quantitative Aptitude',
    'punjabi-language': 'Punjabi Language',
    'logical-reasoning': 'Logical Reasoning',
    'digital-literacy': 'Digital Literacy',
    'english-language': 'English Language',
};

export default async function TopicsPage({ params }) {
    const resolvedParams = await params;

    const topicsData = getTopics(resolvedParams.paperId, resolvedParams.subjectId, resolvedParams.categoryId);
    const categoryName = getCategoryName(resolvedParams.paperId, resolvedParams.subjectId, resolvedParams.categoryId);
    const subjectLabel = subjectLabels[resolvedParams.subjectId] || resolvedParams.subjectId;

    const backLink = `/mini-quiz/${resolvedParams.paperId}/${resolvedParams.subjectId}`;

    // If no topics — show quiz sets directly
    if (topicsData.length === 0) {
        const quizSets = [
            {
                href: `/mini-quiz/${resolvedParams.paperId}/${resolvedParams.subjectId}/${resolvedParams.categoryId}/general/set-1`,
                label: 'Quiz Set 1',
                description: '20 questions · ~15 min',
                icon: '📝',
                badge: 'Set 1',
            },
            {
                href: `/mini-quiz/${resolvedParams.paperId}/${resolvedParams.subjectId}/${resolvedParams.categoryId}/general/set-2`,
                label: 'Quiz Set 2',
                description: '20 questions · ~15 min',
                icon: '📋',
                badge: 'Set 2',
            },
        ];

        return (
            <PageShell
                title={`${categoryName}`}
                subtitle={`${subjectLabel} · Quiz Sets`}
                backLink={backLink}
                backLabel={subjectLabel}
            >
                <SelectionGrid items={quizSets} />
            </PageShell>
        );
    }

    const topics = topicsData.map((topic, idx) => ({
        href: `/mini-quiz/${resolvedParams.paperId}/${resolvedParams.subjectId}/${resolvedParams.categoryId}/${topic.id}`,
        label: topic.name,
        description: topic.description || 'Practice this topic',
        icon: '📌',
    }));

    return (
        <PageShell
            title={`${categoryName}`}
            subtitle={`${subjectLabel} · Select Topic`}
            backLink={backLink}
            backLabel={subjectLabel}
        >
            <SelectionGrid items={topics} />
        </PageShell>
    );
}
