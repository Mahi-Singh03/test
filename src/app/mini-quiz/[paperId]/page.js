import DummyPage from '@/components/testing/DummyPage';
import NavigationButtons from '@/components/testing/NavigationButtons';

export default async function MiniQuizSubjectsPage({ params }) {
    const resolvedParams = await params;
    console.log('MINI QUIZ SUBJECTS PAGE - Params:', resolvedParams);

    // Different subjects based on paper
    const subjectsMap = {
        'paper-1': [
            { href: `/mini-quiz/${resolvedParams.paperId}/general-awareness`, label: 'General Awareness' },
            { href: `/mini-quiz/${resolvedParams.paperId}/quantitative-aptitude`, label: 'Quantitative Aptitude' },
            { href: `/mini-quiz/${resolvedParams.paperId}/punjabi-language`, label: 'Punjabi Language' }
        ],
        'paper-2': [
            { href: `/mini-quiz/${resolvedParams.paperId}/logical-reasoning`, label: 'Logical Reasoning' },
            { href: `/mini-quiz/${resolvedParams.paperId}/digital-literacy`, label: 'Digital Literacy' },
            { href: `/mini-quiz/${resolvedParams.paperId}/english-language`, label: 'English Language' }
        ]
    };

    const subjects = subjectsMap[resolvedParams.paperId] || subjectsMap['paper-1'];

    return (
        <DummyPage
            title="Select Subject"
            params={resolvedParams}
            backLink="/mini-quiz"
        >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Subjects</h2>
            <NavigationButtons links={subjects} />
        </DummyPage>
    );
}
