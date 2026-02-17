import DummyPage from '@/components/testing/DummyPage';
import NavigationButtons from '@/components/testing/NavigationButtons';

export default function MiniQuizPage() {
    console.log('MINI QUIZ PAGE - Route: /mini-quiz');

    const papers = [
        { href: '/mini-quiz/paper-1', label: 'Paper 1' },
        { href: '/mini-quiz/paper-2', label: 'Paper 2' }
    ];

    return (
        <DummyPage
            title="Mini Quiz Mode"
            backLink="/"
        >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Select a Paper</h2>
            <NavigationButtons links={papers} />
        </DummyPage>
    );
}
