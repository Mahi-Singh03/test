export default function RouteInfoCard({ route, description }) {
    return (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-4">
            <div className="text-sm font-mono text-gray-600 mb-1">{route}</div>
            <div className="text-gray-700">{description}</div>
        </div>
    );
}
