'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    FiHome,
    FiFileText,
    FiLayers,
    FiBarChart2,
    FiMenu,
    FiX,
    FiChevronRight,
    FiBookOpen,
    FiGrid
} from 'react-icons/fi';

/**
 * Navbar Component - Dynamic navigation with frosted glass aesthetic
 * Automatically adjusts based on current route and app structure
 * Mobile-first with responsive design
 */
export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Handle scroll effect for glass morphism intensity
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    // Navigation items based on app structure
    const navItems = [
        {
            name: 'Home',
            href: '/',
            icon: FiHome,
            description: 'Dashboard & overview',
            active: pathname === '/'
        },
        {
            name: 'Full Papers',
            href: '/full-paper',
            icon: FiFileText,
            description: 'Complete exam papers',
            active: pathname === '/full-paper' || pathname.startsWith('/full-paper/')
        },
        {
            name: 'Mini Quiz',
            href: '/mini-quiz',
            icon: FiLayers,
            description: 'Topic-wise practice',
            active: pathname === '/mini-quiz' || pathname.startsWith('/mini-quiz/')
        },
        {
            name: 'Results',
            href: '/results',
            icon: FiBarChart2,
            description: 'Your performance',
            active: pathname === '/results' || pathname.startsWith('/results/')
        }
    ];

    // Dynamic breadcrumb generation based on pathname
    const getBreadcrumbs = () => {
        const paths = pathname.split('/').filter(Boolean);
        const breadcrumbs = [];
        let currentPath = '';

        paths.forEach((path, index) => {
            currentPath += `/${path}`;

            // Format the breadcrumb name
            let name = path
                .replace(/-/g, ' ')
                .replace(/(^\w|\s\w)/g, m => m.toUpperCase());

            // Handle dynamic segments (like [paperId], [year], etc.)
            // logic removed as usePathname returns resolved paths

            breadcrumbs.push({
                name,
                href: currentPath,
                isLast: index === paths.length - 1
            });
        });

        return breadcrumbs;
    };

    const breadcrumbs = getBreadcrumbs();

    return (
        <>
            {/* Main Navigation Bar */}
            <nav
                className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${scrolled
                        ? 'bg-card/90 dark:bg-dark-card/90 backdrop-blur-xl border-b border-border/50 dark:border-dark-border/50'
                        : 'bg-card/70 dark:bg-dark-card/70 backdrop-blur-lg'
                    }
        `}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo & Brand */}
                        <div className="flex items-center gap-2">
                            <Link
                                href="/"
                                className="flex items-center gap-2 group"
                            >
                                <div className="w-10 h-10 rounded-2xl bg-accent/10 dark:bg-dark-accent/10 border border-accent/30 dark:border-dark-accent/30 flex items-center justify-center transition-all duration-300 group-hover:scale-95 group-hover:bg-accent/20 dark:group-hover:bg-dark-accent/20">
                                    <FiBookOpen className="w-5 h-5 text-accent dark:text-dark-accent" />
                                </div>
                                <span className="text-xl font-semibold text-text-primary dark:text-dark-text-primary hidden sm:block">
                                    QuizMaster
                                </span>
                            </Link>

                            {/* Breadcrumbs (Desktop) */}
                            {breadcrumbs.length > 0 && (
                                <div className="hidden lg:flex items-center ml-4 gap-1">
                                    <FiChevronRight className="w-4 h-4 text-text-secondary/50 dark:text-dark-text-secondary/50" />
                                    {breadcrumbs.map((crumb, index) => (
                                        <div key={crumb.href} className="flex items-center">
                                            {!crumb.isLast ? (
                                                <Link
                                                    href={crumb.href}
                                                    className="text-sm text-text-secondary/70 dark:text-dark-text-secondary/70 hover:text-accent dark:hover:text-dark-accent transition-colors px-2 py-1 rounded-xl hover:bg-accent/5 dark:hover:bg-dark-accent/5 truncate max-w-[150px] inline-block align-middle"
                                                >
                                                    {crumb.name}
                                                </Link>
                                            ) : (
                                                <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary px-2 truncate max-w-[200px] inline-block align-middle">
                                                    {crumb.name}
                                                </span>
                                            )}
                                            {index < breadcrumbs.length - 1 && (
                                                <FiChevronRight className="w-3 h-3 text-text-secondary/30 dark:text-dark-text-secondary/30" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`
                      relative flex items-center gap-2 px-4 py-2 rounded-2xl
                      transition-all duration-300 group
                      ${item.active
                                                ? 'bg-accent/10 dark:bg-dark-accent/10 border border-accent/30 dark:border-dark-accent/30 text-accent dark:text-dark-accent'
                                                : 'text-text-secondary dark:text-dark-text-secondary hover:text-accent dark:hover:text-dark-accent hover:bg-accent/5 dark:hover:bg-dark-accent/5'
                                            }
                    `}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="font-medium">{item.name}</span>

                                        {/* Tooltip on hover */}
                                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-card dark:bg-dark-card backdrop-blur-xl border border-border dark:border-dark-border rounded-xl px-3 py-1.5 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-glass dark:shadow-glass-dark">
                                            {item.description}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden w-12 h-12 rounded-2xl bg-card dark:bg-dark-card border border-border dark:border-dark-border flex items-center justify-center hover:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 dark:focus:ring-dark-accent/50"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <FiX className="w-6 h-6 text-text-primary dark:text-dark-text-primary" />
                            ) : (
                                <FiMenu className="w-6 h-6 text-text-primary dark:text-dark-text-primary" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`
          fixed inset-0 z-40 lg:hidden
          transition-all duration-500
          ${isMobileMenuOpen
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                    }
        `}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Menu Panel */}
                <div
                    className={`
            absolute top-20 left-4 right-4
            bg-card dark:bg-dark-card backdrop-blur-xl
            border border-border dark:border-dark-border
            rounded-4xl shadow-glass dark:shadow-glass-dark
            transition-all duration-500
            ${isMobileMenuOpen
                            ? 'translate-y-0 opacity-100'
                            : '-translate-y-8 opacity-0'
                        }
          `}
                >
                    {/* Menu Header */}
                    <div className="p-4 border-b border-border/50 dark:border-dark-border/50">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-accent/10 dark:bg-dark-accent/10 border border-accent/30 dark:border-dark-accent/30 flex items-center justify-center">
                                <FiGrid className="w-6 h-6 text-accent dark:text-dark-accent" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-text-primary dark:text-dark-text-primary">
                                    Navigation
                                </h3>
                                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                                    Select a section
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                    flex items-center gap-4 p-4 rounded-3xl
                    transition-all duration-300
                    ${item.active
                                            ? 'bg-accent/10 dark:bg-dark-accent/10 border border-accent/30 dark:border-dark-accent/30'
                                            : 'hover:bg-accent/5 dark:hover:bg-dark-accent/5'
                                        }
                  `}
                                >
                                    <div className={`
                    w-12 h-12 rounded-2xl flex items-center justify-center
                    transition-all duration-300
                    ${item.active
                                            ? 'bg-accent/20 dark:bg-dark-accent/20'
                                            : 'bg-card dark:bg-dark-card border border-border dark:border-dark-border'
                                        }
                  `}>
                                        <Icon className={`
                      w-6 h-6
                      ${item.active
                                                ? 'text-accent dark:text-dark-accent'
                                                : 'text-text-secondary dark:text-dark-text-secondary'
                                            }
                    `} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className={`
                      font-medium
                      ${item.active
                                                ? 'text-accent dark:text-dark-accent'
                                                : 'text-text-primary dark:text-dark-text-primary'
                                            }
                    `}>
                                            {item.name}
                                        </h4>
                                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                                            {item.description}
                                        </p>
                                    </div>
                                    <FiChevronRight className={`
                    w-5 h-5
                    ${item.active
                                            ? 'text-accent dark:text-dark-accent'
                                            : 'text-text-secondary/50 dark:text-dark-text-secondary/50'
                                        }
                  `} />
                                </Link>
                            );
                        })}
                    </div>

                    {/* Current Location */}
                    {breadcrumbs.length > 0 && (
                        <div className="p-4 border-t border-border/50 dark:border-dark-border/50">
                            <p className="text-xs text-text-secondary/60 dark:text-dark-text-secondary/60 mb-2">
                                CURRENT LOCATION
                            </p>
                            <div className="flex items-center gap-2 flex-wrap">
                                {breadcrumbs.map((crumb, index) => (
                                    <div key={crumb.href} className="flex items-center">
                                        <span className={`
                      text-sm px-2 py-1 rounded-xl inline-block max-w-[150px] truncate align-middle
                      ${crumb.isLast
                                                ? 'bg-accent/10 dark:bg-dark-accent/10 text-accent dark:text-dark-accent font-medium'
                                                : 'text-text-secondary dark:text-dark-text-secondary'
                                            }
                    `}>
                                            {crumb.name}
                                        </span>
                                        {index < breadcrumbs.length - 1 && (
                                            <FiChevronRight className="w-3 h-3 text-text-secondary/30 dark:text-dark-text-secondary/30 mx-1" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Spacer to prevent content from hiding behind navbar */}
            <div className="h-16 lg:h-20" />
        </>
    );
}