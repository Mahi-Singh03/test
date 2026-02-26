import fs from 'fs';
import path from 'path';
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

    // Dynamically list dates based on filesystem
    const dirPath = path.join(process.cwd(), 'src', 'data', 'papers', resolvedParams.paperId, resolvedParams.year);
    let dates = [];

    try {
        const folders = fs.readdirSync(dirPath, { withFileTypes: true })
            .filter((d) => d.isDirectory())
            .map((d) => d.name);

        dates = folders.map(folder => {
            const metaPath = path.join(dirPath, folder, 'meta.json');
            let meta = {};
            try {
                meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
            } catch (e) { }

            return {
                href: `/full-paper/${resolvedParams.paperId}/${resolvedParams.year}/${folder}`,
                label: meta.title || `${paperName} ${resolvedParams.year}`,
                description: meta.duration ? `${meta.duration} mins` : 'Full Paper',
                icon: '📝',
                badge: meta.totalQuestions ? `${meta.totalQuestions} Questions` : 'Questions',
            };
        });
    } catch (e) {
        console.error("Error reading exam dates:", e);
    }

    return (
        <PageShell
            title="Available Papers"
            subtitle={`${paperName} · ${resolvedParams.year}`}
            backLink={`/full-paper/${resolvedParams.paperId}`}
            backLabel={`${resolvedParams.year} Years`}
        >
            {dates.length > 0 ? (
                <SelectionGrid items={dates} />
            ) : (
                <div style={{ textAlign: 'center', padding: '3rem 1.5rem' }} className="card">
                    <p>No papers available for this year yet.</p>
                </div>
            )}
        </PageShell>
    );
}
