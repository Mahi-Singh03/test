import Link from 'next/link';

export default function NavigationButtons({ links }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.href}
                    className="block bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-4 text-center font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
}
