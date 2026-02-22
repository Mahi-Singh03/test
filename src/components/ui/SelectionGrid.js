import Link from 'next/link';

/**
 * SelectionGrid — renders a grid of cards for navigation (papers, subjects, categories, etc.)
 * Each card has an icon slot, title, optional description, and an arrow.
 */
export default function SelectionGrid({ items }) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '1rem',
        }}>
            {items.map((item, idx) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`card card-interactive animate-fade-up stagger-${Math.min(idx + 1, 6)}`}
                    style={{ textDecoration: 'none', display: 'block', padding: '1.25rem 1.5rem' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                        {/* Left: icon + text */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', flex: 1, minWidth: 0 }}>
                            {item.icon && (
                                <div style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '12px',
                                    background: 'var(--accent-soft)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    fontSize: '1.25rem',
                                }}>
                                    {item.icon}
                                </div>
                            )}
                            <div style={{ minWidth: 0 }}>
                                <p style={{
                                    fontSize: '0.9375rem',
                                    fontWeight: 600,
                                    color: 'var(--text-1)',
                                    lineHeight: 1.4,
                                    marginBottom: item.description ? '0.25rem' : 0,
                                }}>
                                    {item.label}
                                </p>
                                {item.description && (
                                    <p style={{
                                        fontSize: '0.8125rem',
                                        color: 'var(--text-2)',
                                        lineHeight: 1.5,
                                    }}>
                                        {item.description}
                                    </p>
                                )}
                                {item.badge && (
                                    <span className="badge badge-blue" style={{ marginTop: '0.375rem' }}>
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Chevron */}
                        <svg
                            width="18" height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--text-3)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ flexShrink: 0, transition: 'transform 0.2s ease, stroke 0.2s ease' }}
                            className="card-chevron"
                        >
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </div>
                </Link>
            ))}
        </div>
    );
}
