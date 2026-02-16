import DummyPage from '@/components/testing/DummyPage';
import NavigationButtons from '@/components/testing/NavigationButtons';

export default async function ExamDatesPage({ params }) {
    const resolvedParams = await params;
    console.log('EXAM DATES PAGE - Params:', resolvedParams);

    const dates = [
        { href: `/full-paper/${resolvedParams.paperId}/${resolvedParams.year}/jan-15`, label: 'January 15' },
        { href: `/full-paper/${resolvedParams.paperId}/${resolvedParams.year}/feb-05`, label: 'February 05' }
    ];

    return (
        <DummyPage
            title="Select Exam Date"
            params={resolvedParams}
            backLink={`/full-paper/${resolvedParams.paperId}`}
        >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Exam Dates</h2>
            <NavigationButtons links={dates} />
        </DummyPage>
    );
}
