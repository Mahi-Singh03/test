import DummyPage from '@/components/testing/DummyPage';
import NavigationButtons from '@/components/testing/NavigationButtons';
import { getTopics, getCategoryName } from '@/config/subjects';

export default async function TopicsPage({ params }) {
    const resolvedParams = await params;
    console.log('TOPICS PAGE - Params:', resolvedParams);

    const topicsData = getTopics(resolvedParams.paperId, resolvedParams.subjectId, resolvedParams.categoryId);
    const categoryName = getCategoryName(resolvedParams.paperId, resolvedParams.subjectId, resolvedParams.categoryId);

    // If no topics, show quiz sets directly
    if (topicsData.length === 0) {
        const quizSets = [
            { href: `/mini-quiz/${resolvedParams.paperId}/${resolvedParams.subjectId}/${resolvedParams.categoryId}/general/set-1`, label: 'Quiz Set 1' },
            { href: `/mini-quiz/${resolvedParams.paperId}/${resolvedParams.subjectId}/${resolvedParams.categoryId}/general/set-2`, label: 'Quiz Set 2' }
        ];

        return (
            <DummyPage
                title={`${categoryName} - Quiz Sets`}
                params={resolvedParams}
                backLink={`/mini-quiz/${resolvedParams.paperId}/${resolvedParams.subjectId}`}
            >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Quiz Sets</h2>
                <NavigationButtons links={quizSets} />
            </DummyPage>
        );
    }

    // Show topics
    const topics = topicsData.map(topic => ({
        href: `/mini-quiz/${resolvedParams.paperId}/${resolvedParams.subjectId}/${resolvedParams.categoryId}/${topic.id}`,
        label: topic.name
    }));

    return (
        <DummyPage
            title={`${categoryName} - Select Topic`}
            params={resolvedParams}
            backLink={`/mini-quiz/${resolvedParams.paperId}/${resolvedParams.subjectId}`}
        >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Topics</h2>
            <NavigationButtons links={topics} />
        </DummyPage>
    );
}
