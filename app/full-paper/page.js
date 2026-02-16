import DummyPage from '@/components/testing/DummyPage';
import NavigationButtons from '@/components/testing/NavigationButtons';

export default function FullPaperPage() {
    console.log('FULL PAPER PAGE - Route: /full-paper');

    const papers = [
        { href: '/full-paper/paper-1', label: 'Paper 1' },
        { href: '/full-paper/paper-2', label: 'Paper 2' },
        { href: '/full-paper/paper-3', label: 'Paper 3' }
    ];

    return (
        <DummyPage
            title="Full Paper Mode"
            backLink="/"
        >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Select a Paper</h2>
            <NavigationButtons links={papers} />
        </DummyPage>
    );
}
