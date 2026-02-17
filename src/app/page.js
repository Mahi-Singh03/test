import DummyPage from '@/components/testing/DummyPage';
import NavigationButtons from '@/components/testing/NavigationButtons';

export default function HomePage() {
    console.log('HOME PAGE - Route: /');

    const links = [
        { href: '/full-paper', label: '📄 Full Paper Mode' },
        { href: '/mini-quiz', label: '🎯 Mini Quiz Mode' },
        { href: '/results/test-session-123', label: '📊 View Sample Results' }
    ];

    return (
        <DummyPage title="Quiz Application - Home">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Quiz App</h2>
                <p className="text-gray-600">Select a mode to test navigation</p>
            </div>
            <NavigationButtons links={links} />
        </DummyPage>
    );
}
