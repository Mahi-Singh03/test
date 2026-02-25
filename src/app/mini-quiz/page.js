import PageShell from '@/components/layout/PageShell';
import SelectionGrid from '@/components/ui/SelectionGrid';
import { getPapers } from '@/lib/quizData';

export default async function MiniQuizPapersPage() {
    const papers = getPapers();

    const items = papers.map((p) => ({
        href: `/mini-quiz/${p.id}`,
        label: p.label,
        description: p.description,
        icon: p.icon,
    }));

    // Fallback if no data folder entries yet
    const fallbackItems = [
        { href: '/mini-quiz/paper-1', label: 'Paper 1', description: 'General Awareness, Quantitative Aptitude, Punjabi Language', icon: '📄' },
        { href: '/mini-quiz/paper-2', label: 'Paper 2', description: 'Logical Reasoning, Digital Literacy, English Language', icon: '📋' },
    ];

    return (
        <PageShell
            title="Mini Quiz"
            subtitle="Choose your paper"
            backLink="/"
            backLabel="Home"
        >
            <SelectionGrid items={items.length > 0 ? items : fallbackItems} />
        </PageShell>
    );
}
