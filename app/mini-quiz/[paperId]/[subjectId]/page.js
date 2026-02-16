import DummyPage from '@/components/testing/DummyPage';
import NavigationButtons from '@/components/testing/NavigationButtons';
import { getCategories } from '@/config/subjects';

export default async function CategoriesPage({ params }) {
    const resolvedParams = await params;
    console.log('CATEGORIES PAGE - Resolved Params:', resolvedParams);

    const categoriesData = getCategories(resolvedParams.paperId, resolvedParams.subjectId);
    console.log('Categories Data:', categoriesData);
    console.log('Categories Data Keys:', Object.keys(categoriesData));

    const categories = Object.entries(categoriesData).map(([id, data]) => ({
        href: `/mini-quiz/${resolvedParams.paperId}/${resolvedParams.subjectId}/${id}`,
        label: data.name
    }));

    return (
        <DummyPage
            title="Select Category"
            params={resolvedParams}
            backLink={`/mini-quiz/${resolvedParams.paperId}`}
        >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Categories</h2>
            {categories.length > 0 ? (
                <NavigationButtons links={categories} />
            ) : (
                <p className="text-gray-600 text-center py-8">No categories available</p>
            )}
        </DummyPage>
    );
}

