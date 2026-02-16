import DummyPage from '@/components/testing/DummyPage';

export default async function FullPaperQuizPage({ params }) {
    const resolvedParams = await params;
    console.log('FULL PAPER QUIZ PAGE - Params:', resolvedParams);

    return (
        <DummyPage
            title="Full Paper Quiz (Dummy)"
            params={resolvedParams}
            backLink={`/full-paper/${resolvedParams.paperId}/${resolvedParams.year}`}
        >
            <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Full Paper Quiz Page</h2>
                <p className="text-gray-600 mb-6">This is where the actual quiz would load</p>

                <div className="bg-green-50 rounded-lg p-6 max-w-md mx-auto">
                    <h3 className="font-semibold text-green-800 mb-2">Route Test Successful!</h3>
                    <p className="text-sm text-green-700">All parameters captured correctly</p>
                </div>

                <div className="mt-8">
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
