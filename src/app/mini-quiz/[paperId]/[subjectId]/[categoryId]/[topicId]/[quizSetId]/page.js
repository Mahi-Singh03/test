import { notFound } from 'next/navigation';
import QuizEngine from '@/components/quiz/QuizEngine';
import { getQuizQuestions, getMeta } from '@/lib/quizData';

/* ─── Metadata ─── */
export async function generateMetadata({ params }) {
    const { paperId, subjectId, categoryId, topicId, quizSetId } = await params;
    const topicMeta = getMeta(paperId, subjectId, categoryId, topicId);
    const categoryMeta = getMeta(paperId, subjectId, categoryId);
    const topicLabel = topicMeta?.label || topicId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const categoryLabel = categoryMeta?.label || categoryId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const setLabel = quizSetId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    return {
        title: `${categoryLabel} — ${setLabel} | Exam Center`,
        description: `Practice ${topicLabel} with timed exam conditions. +4/−1 marking scheme, 60-minute countdown.`,
    };
}

/* ─── Page ─── */
export default async function QuizGamePage({ params }) {
    const { paperId, subjectId, categoryId, topicId, quizSetId } = await params;

    /* Load questions from the file-system mirrored path */
    const questions = getQuizQuestions(paperId, subjectId, categoryId, topicId, quizSetId);

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
        notFound();
    }

    /* Build meta from folder _meta.json files */
    const subjectMeta = getMeta(paperId, subjectId);
    const categoryMeta = getMeta(paperId, subjectId, categoryId);
    const topicMeta = getMeta(paperId, subjectId, categoryId, topicId);
    const paperMeta = getMeta(paperId);

    const subjectLabel = subjectMeta?.label || subjectId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const categoryLabel = categoryMeta?.label || categoryId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const topicLabel = topicMeta?.label || topicId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const paperLabel = paperMeta?.label || paperId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const setLabel = quizSetId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    const meta = {
        title: subjectLabel,
        subject: `${categoryLabel} · ${topicLabel} · ${setLabel}`,
        paper: paperLabel,
        duration: 60,
        marksPerQuestion: 4,
        negativeMarking: 1,
    };

    return <QuizEngine questions={questions} meta={meta} />;
}
