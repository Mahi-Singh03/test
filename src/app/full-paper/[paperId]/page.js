import DummyPage from '@/components/testing/DummyPage';
import NavigationButtons from '@/components/testing/NavigationButtons';

export default async function PaperYearsPage({ params }) {
    const resolvedParams = await params;
    console.log('PAPER YEARS PAGE - Params:', resolvedParams);

    const years = [
        { href: `/full-paper/${resolvedParams.paperId}/2024`, label: '2024' },
        { href: `/full-paper/${resolvedParams.paperId}/2023`, label: '2023' }
    ];

    return (
        <DummyPage
            title="Select Year"
            params={resolvedParams}
            backLink="/full-paper"
        >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Years</h2>
            <NavigationButtons links={years} />
        </DummyPage>
    );
}
