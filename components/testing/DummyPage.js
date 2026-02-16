export default function DummyPage({ 
  title, 
  params = {}, 
  children,
  backLink 
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
          
          {/* Route Params Display */}
          {Object.keys(params).length > 0 && (
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h2 className="text-sm font-semibold text-blue-800 mb-2">Route Parameters:</h2>
              <div className="space-y-1">
                {Object.entries(params).map(([key, value]) => (
                  <div key={key} className="text-sm">
                    <span className="font-medium text-gray-700">{key}:</span>{' '}
                    <span className="text-blue-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Breadcrumb */}
          {backLink && (
            <a 
              href={backLink}
              className="inline-block text-blue-600 hover:text-blue-800 text-sm font-medium mb-4"
            >
              ← Back
            </a>
          )}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-md p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
