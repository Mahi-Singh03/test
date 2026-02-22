import PageShell from '@/components/layout/PageShell';
import SelectionGrid from '@/components/ui/SelectionGrid';

const paperNames = {
    'paper-1': 'Paper 1',
    'paper-2': 'Paper 2',
    'paper-3': 'Paper 3',
};

export default async function ExamDatesPage({ params }) {
    const resolvedParams = await params;
    const paperName = paperNames[resolvedParams.paperId] || resolvedParams.paperId;

    const dates = [
        {
            href: `/full-paper/${resolvedParams.paperId}/${resolvedParams.year}/jan-15`,
            label: 'January 15',
            description: `${resolvedParams.year} · Morning Shift`,
            icon: '🌅',
            badge: '100 Questions',
        },
        {
            href: `/full-paper/${resolvedParams.paperId}/${resolvedParams.year}/feb-05`,
            label: 'February 05',
            description: `${resolvedParams.year} · Evening Shift`,
            icon: '🌆',
            badge: '100 Questions',
        },
    ];

    return (
        <PageShell
            title="Select Exam Date"
            subtitle={`${paperName} · ${resolvedParams.year}`}
            backLink={`/full-paper/${resolvedParams.paperId}`}
            backLabel={`${resolvedParams.year} Years`}
        >
            <SelectionGrid items={dates} />
        </PageShell>
    );
}
