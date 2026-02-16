import DummyPage from '@/components/testing/DummyPage';

export default async function ResultsPage({ params }) {
    const resolvedParams = await params;
    console.log('RESULTS PAGE - Params:', resolvedParams);

    // Dummy results data
    const dummyResults = {
        score: 85,
        totalQuestions: 100,
        correct: 85,
        incorrect: 10,
        unattempted: 5,
        timeTaken: '45 minutes'
    };

    return (
        <DummyPage
            title="Quiz Results (Dummy)"
            params={resolvedParams}
        >
            <div className="text-center py-8">
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Score</h2>
                <div className="text-5xl font-bold text-green-600 mb-8">
                    {dummyResults.score}%
                </div>

                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
                    <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-600">{dummyResults.correct}</div>
                        <div className="text-sm text-gray-600">Correct</div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-red-600">{dummyResults.incorrect}</div>
                        <div className="text-sm text-gray-600">Incorrect</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-gray-600">{dummyResults.unattempted}</div>
                        <div className="text-sm text-gray-600">Unattempted</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-blue-600">{dummyResults.timeTaken}</div>
                        <div className="text-sm text-gray-600">Time Taken</div>
                    </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-6 max-w-md mx-auto mb-8">
                    <h3 className="font-semibold text-yellow-800 mb-2">📝 Note</h3>
                    <p className="text-sm text-yellow-700">This is dummy data for testing purposes</p>
                </div>

                <div className="space-x-4">
                    <a
                        href="/"
                        className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                    >
                        Back to Home
                    </a>
                    <a
                        href="/mini-quiz"
                        className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
                    >
                        Try Another Quiz
                    </a>
                </div>
            </div>
        </DummyPage>
    );
}
