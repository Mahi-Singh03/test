import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import FullPaperEngine from '@/components/paper/FullPaperEngine';

export default async function FullPaperQuizPage({ params }) {
    const resolvedParams = await params;

    const paperFolder = path.join(process.cwd(), 'src', 'data', 'papers', resolvedParams.paperId, resolvedParams.year, resolvedParams.examDate);
    const jsonPath = path.join(paperFolder, `${resolvedParams.paperId}.json`);
    const metaPath = path.join(paperFolder, 'meta.json');

    let questions = [];
    let meta = {};

    try {
        questions = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    } catch (e) {
        return notFound();
    }

    try {
        meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
    } catch (e) {
        meta = {
            title: resolvedParams.paperId.toUpperCase(),
            year: resolvedParams.year,
            date: resolvedParams.examDate
        };
    }

    return <FullPaperEngine questions={questions} meta={meta} />;
}
