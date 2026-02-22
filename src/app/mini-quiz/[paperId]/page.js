import PageShell from '@/components/layout/PageShell';
import SelectionGrid from '@/components/ui/SelectionGrid';

const paperNames = {
    'paper-1': 'Paper 1',
    'paper-2': 'Paper 2',
};

const subjectsMap = {
    'paper-1': [
        {
            href: null, // built below
            subjectId: 'general-awareness',
            label: 'General Awareness',
            description: 'Current affairs, history & geography',
            icon: '🌍',
        },
        {
            subjectId: 'quantitative-aptitude',
            label: 'Quantitative Aptitude',
            description: 'Maths, arithmetic & reasoning',
            icon: '🔢',
        },
        {
            subjectId: 'punjabi-language',
            label: 'Punjabi Language',
            description: 'Grammar, comprehension & vocabulary',
            icon: '✍️',
        },
    ],
    'paper-2': [
        {
            subjectId: 'logical-reasoning',
            label: 'Logical Reasoning',
            description: 'Patterns, sequences & puzzles',
            icon: '🧩',
        },
        {
            subjectId: 'digital-literacy',
            label: 'Digital Literacy',
            description: 'Computers, internet & technology',
            icon: '💻',
        },
        {
            subjectId: 'english-language',
            label: 'English Language',
            description: 'Grammar, comprehension & writing',
            icon: '📖',
        },
    ],
};

export default async function MiniQuizSubjectsPage({ params }) {
    const resolvedParams = await params;
    const paperName = paperNames[resolvedParams.paperId] || resolvedParams.paperId;
    const rawSubjects = subjectsMap[resolvedParams.paperId] || subjectsMap['paper-1'];

    const subjects = rawSubjects.map((s) => ({
        ...s,
        href: `/mini-quiz/${resolvedParams.paperId}/${s.subjectId}`,
    }));

    return (
        <PageShell
            title="Select Subject"
            subtitle={paperName}
            backLink="/mini-quiz"
            backLabel="Mini Quiz"
        >
            <SelectionGrid items={subjects} />
        </PageShell>
    );
}
