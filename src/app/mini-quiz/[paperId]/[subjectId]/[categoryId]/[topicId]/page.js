import DummyPage from '@/components/testing/DummyPage';
import NavigationButtons from '@/components/testing/NavigationButtons';

export default async function QuizSetsPage({ params }) {
    const resolvedParams = await params;
    console.log('QUIZ SETS PAGE - Params:', resolvedParams);

    // Sample quiz sets
    const quizSets = [
        { href: `/mini-quiz/${resolvedParams.paperId}/${resolvedParams.subjectId}/${resolvedParams.categoryId}/${resolvedParams.topicId}/set-1`, label: 'Quiz Set 1' },
        { href: `/mini-quiz/${resolvedParams.paperId}/${resolvedParams.subjectId}/${resolvedParams.categoryId}/${resolvedParams.topicId}/set-2`, label: 'Quiz Set 2' }
    ];

    return (
        <DummyPage
            title="Select Quiz Set"
            params={resolvedParams}
            backLink={`/mini-quiz/${resolvedParams.paperId}/${resolvedParams.subjectId}/${resolvedParams.categoryId}`}
        >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Quiz Sets</h2>
            <NavigationButtons links={quizSets} />
        </DummyPage>
    );
}
