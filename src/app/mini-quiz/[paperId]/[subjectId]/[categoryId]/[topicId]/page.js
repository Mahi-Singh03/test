import { redirect } from 'next/navigation';

// Legacy route: /mini-quiz/{paperId}/{subjectId}/{categoryId}/{topicId}
// We now show quiz sets directly at: /mini-quiz/{paperId}/{subjectId}/{categoryId}
export default async function LegacyTopicListRedirect({ params }) {
    const { paperId, subjectId, categoryId } = await params;

    redirect(`/mini-quiz/${paperId}/${subjectId}/${categoryId}`);
}
