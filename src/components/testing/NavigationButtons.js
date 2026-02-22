import Link from 'next/link';

export default function NavigationButtons({ links }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.href}
                    className="
                        group relative flex items-center justify-center
                        bg-[var(--accent)] text-white dark:bg-[var(--dark-accent)] dark:text-white
                        font-semibold rounded-[40px] dark:rounded-[32px] p-4 text-center
                        shadow-[var(--shadow-glass)] dark:shadow-[var(--shadow-glass-dark)]
                        transition-all duration-300 ease-out
                        hover:-translate-y-[3px] dark:hover:-translate-y-[4px] dark:hover:scale-[1.01]
                        hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-[var(--background)] focus:ring-[var(--accent)] dark:focus:ring-[var(--dark-accent)]
                    "
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
}
