import fs from 'fs';
import path from 'path';
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

    const dirPath = path.join(process.cwd(), 'src', 'data', 'papers', resolvedParams.paperId);
    let years = [];

    try {
        const folders = fs.readdirSync(dirPath, { withFileTypes: true })
            .filter((d) => d.isDirectory())
            .map((d) => d.name)
            .sort().reverse();

        years = folders.map(folder => {
            const datePath = path.join(dirPath, folder);
            let dateCount = 0;
            try {
                dateCount = fs.readdirSync(datePath, { withFileTypes: true }).filter(d => d.isDirectory()).length;
            } catch (e) { }

            return {
                href: `/full-paper/${resolvedParams.paperId}/${folder}`,
                label: folder,
                description: `${paperName} · ${folder}`,
                icon: '🗓️',
                badge: `${dateCount} Papers`,
            };
        });
    } catch (e) {
        console.error("Error reading years:", e);
    }

    return (
        <PageShell
            title="Select Year"
            subtitle={paperName}
            backLink="/full-paper"
            backLabel="Full Papers"
        >
            {years.length > 0 ? (
                <SelectionGrid items={years} />
            ) : (
                <div style={{ textAlign: 'center', padding: '3rem 1.5rem' }} className="card">
                    <p>No papers available yet.</p>
                </div>
            )}
        </PageShell>
    );
}
