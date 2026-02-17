import DummyPage from '@/components/testing/DummyPage';

export default async function MiniQuizPage({ params }) {
    const resolvedParams = await params;
    console.log('MINI QUIZ PAGE - Params:', resolvedParams);

    return (
        <DummyPage
            title="Mini Quiz (Dummy)"
            params={resolvedParams}
            backLink={`/mini-quiz/${resolvedParams.paperId}/${resolvedParams.subjectId}/${resolvedParams.categoryId}/${resolvedParams.topicId}`}
        >
            <div className="text-center py-12">
                <div className="text-6xl mb-4">🎯</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Mini Quiz Page</h2>
                <p className="text-gray-600 mb-6">This is where the actual mini quiz would load</p>

                <div className="bg-green-50 rounded-lg p-6 max-w-md mx-auto">
                    <h3 className="font-semibold text-green-800 mb-2">Route Test Successful!</h3>
                    <p className="text-sm text-green-700">All parameters captured correctly</p>
                </div>

                <div className="mt-8 space-y-4">
                    <a
                        href={`/results/mini-${resolvedParams.quizSetId}-${Date.now()}`}
                        className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition mr-4"
                    >
                        View Sample Results
                    </a>
                    <a
                        href="/"
                        className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                    >
                        Back to Home
                    </a>
                </div>
            </div>
        </DummyPage>
    );
}
