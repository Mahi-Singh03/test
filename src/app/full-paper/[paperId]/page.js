import PageShell from '@/components/layout/PageShell';
import SelectionGrid from '@/components/ui/SelectionGrid';

const paperNames = {
    'paper-1': 'Paper 1',
    'paper-2': 'Paper 2',
    'paper-3': 'Paper 3',
};

export default async function PaperYearsPage({ params }) {
    const resolvedParams = await params;
    const paperName = paperNames[resolvedParams.paperId] || resolvedParams.paperId;

    const years = [
        {
            href: `/full-paper/${resolvedParams.paperId}/2024`,
            label: '2024',
            description: 'Latest exam year',
            icon: '🗓️',
            badge: '2 Dates',
        },
        {
            href: `/full-paper/${resolvedParams.paperId}/2023`,
            label: '2023',
            description: 'Coming Soon',
            icon: '📅',
            badge: '2 Dates',
        },
        {
            href: `/full-paper/${resolvedParams.paperId}/2022`,
            label: '2022',
            description: 'Coming Soon',
            icon: '📅',
            badge: '2 Dates',
        }, {
            href: `/full-paper/${resolvedParams.paperId}/2021`,
            label: '2021',
            description: 'Coming Soon',
            icon: '📅',
            badge: '2 Dates',
        },
        {
            href: `/full-paper/${resolvedParams.paperId}/2020`,
            label: '2020',
            description: 'Coming Soon',
            icon: '📅',
            badge: '2 Dates',
        },
        {
            href: `/full-paper/${resolvedParams.paperId}/2023`,
            label: '2023',
            description: 'Coming Soon',
            icon: '📅',
            badge: '2 Dates',
        },
    ];

    return (
        <PageShell
            title="Select Year"
            subtitle={paperName}
            backLink="/full-paper"
            backLabel="Full Papers"
        >
            <SelectionGrid items={years} />
        </PageShell>
    );
}
