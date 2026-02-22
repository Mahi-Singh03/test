'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const modes = [
    {
        id: 'full-paper',
        href: '/full-paper',
        label: 'Full Question Paper',
        shortLabel: 'Full Paper',
        description: 'Attempt complete exam papers in real test conditions. Track your performance across all subjects.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
            </svg>
        ),
        accent: '#1565C0',
        accentDark: '#1E88E5',
        bg: 'rgba(21,101,192,0.06)',
        bgDark: 'rgba(30,136,229,0.10)',
        features: ['Full exam simulation', 'All subjects covered', 'Time tracking'],
        emoji: '📄',
    },
    {
        id: 'mini-quiz',
        href: '/mini-quiz',
        label: 'Topic-wise Mini Quiz',
        shortLabel: 'Mini Quiz',
        description: 'Focus on specific topics and categories. Perfect for targeted practice and quick revision.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
        ),
        accent: '#7C3AED',
        accentDark: '#A78BFA',
        bg: 'rgba(124,58,237,0.06)',
        bgDark: 'rgba(167,139,250,0.10)',
        features: ['Topic-wise practice', 'Quick 10–20 min sets', 'Category focus'],
        emoji: '🎯',
    },
];

function ModeCard({ mode, index }) {
    return (
        <Link
            href={mode.href}
            id={`mode-card-${mode.id}`}
            className={`card card-interactive animate-fade-up stagger-${index + 1}`}
            style={{ textDecoration: 'none', display: 'block', padding: '0' }}
        >
            {/* Card header */}
            <div style={{
                padding: '1.75rem 1.75rem 1.25rem',
                borderBottom: '1px solid var(--border)',
            }}>
                {/* Icon */}
                <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    background: 'var(--icon-bg, rgba(21,101,192,0.08))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--icon-color, #1565C0)',
                    marginBottom: '1.25rem',
                    '--icon-bg': mode.bg,
                    '--icon-color': mode.accent,
                }}>
                    {mode.icon}
                </div>

                <h2 style={{
                    fontSize: '1.1875rem',
                    fontWeight: 700,
                    color: 'var(--text-1)',
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.01em',
                }}>
                    {mode.label}
                </h2>
                <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-2)',
                    lineHeight: 1.6,
                }}>
                    {mode.description}
                </p>
            </div>

            {/* Features list */}
            <div style={{ padding: '1.25rem 1.75rem 1.75rem' }}>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {mode.features.map((f) => (
                        <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{
                                width: '18px', height: '18px',
                                borderRadius: '50%',
                                background: mode.bg,
                                color: mode.accent,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0,
                            }}>
                                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="2 6 5 9 10 3" />
                                </svg>
                            </span>
                            <span style={{ fontSize: '0.8125rem', color: 'var(--text-2)', fontWeight: 500 }}>{f}</span>
                        </li>
                    ))}
                </ul>

                {/* CTA row */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '1.25rem',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid var(--border)',
                }}>
                    <span style={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: mode.accent,
                    }}>
                        Start {mode.shortLabel} →
                    </span>
                    <div style={{
                        width: '32px', height: '32px',
                        borderRadius: '8px',
                        background: mode.bg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={mode.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function HomePage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    return (
        <div className="page-wrapper" style={{ maxWidth: '800px', margin: '0 auto' }}>

            {/* Hero section */}
            <div className="animate-fade-up" style={{ textAlign: 'center', marginBottom: '3rem', paddingTop: '1rem' }}>
                {/* Badge */}
                <div className="badge badge-blue animate-fade-up" style={{
                    display: 'inline-flex',
                    marginBottom: '1.25rem',
                    animationDelay: '0s',
                }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    Smart Exam Preparation
                </div>

                <h1 className="animate-fade-up stagger-1" style={{
                    fontSize: 'clamp(2rem, 7vw, 3rem)',
                    fontWeight: 900,
                    color: 'var(--text-1)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    marginBottom: '1rem',
                }}>
                    Prepare Smarter,<br />
                    <span style={{ color: 'var(--accent)' }}>Score Higher</span>
                </h1>

                <p className="animate-fade-up stagger-2" style={{
                    fontSize: 'clamp(0.9375rem, 2.5vw, 1.0625rem)',
                    color: 'var(--text-2)',
                    maxWidth: '520px',
                    margin: '0 auto',
                    lineHeight: 1.7,
                }}>
                    Choose how you want to practice today — attempt a full question paper or focus on specific topics with mini quizzes.
                </p>
            </div>

            {/* Mode selection cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: '1.25rem',
                marginBottom: '2.5rem',
            }}>
                {modes.map((mode, idx) => (
                    <ModeCard key={mode.id} mode={mode} index={idx} />
                ))}
            </div>

            {/* Stats strip */}
            <div
                className="card animate-fade-up stagger-4"
                style={{
                    padding: '1.25rem 1.5rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.5rem',
                    textAlign: 'center',
                }}
            >
                {[
                    { value: '3', label: 'Question Papers' },
                    { value: '6+', label: 'Subjects' },
                    { value: '100%', label: 'Free' },
                ].map((stat) => (
                    <div key={stat.label}>
                        <p style={{ fontSize: 'clamp(1.25rem, 4vw, 1.625rem)', fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.02em' }}>{stat.value}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-2)', fontWeight: 500, marginTop: '0.125rem' }}>{stat.label}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}
