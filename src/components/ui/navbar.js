'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiHome,
  FiFileText,
  FiLayers,
  FiBarChart2,
  FiMenu,
  FiX,
  FiBookOpen,
  FiMoon,
  FiSun,
  FiChevronDown,
  FiTarget,
  FiChevronRight,
} from 'react-icons/fi';

const navItems = [
  {
    id: 'home',
    name: 'Home',
    href: '/',
    icon: FiHome,
    pattern: /^\/$/,
  },
  {
    id: 'practice',
    name: 'Practice',
    icon: FiLayers,
    pattern: /^\/(full-paper|mini-quiz)/,
    dropdownItems: [
      {
        id: 'full-papers',
        name: 'Full Papers',
        href: '/full-paper',
        icon: FiFileText,
        pattern: /^\/full-paper/,
        description: 'Complete question papers',
      },
      {
        id: 'mini-quiz',
        name: 'Mini Quiz',
        href: '/mini-quiz',
        icon: FiTarget,
        pattern: /^\/mini-quiz/,
        description: 'Topic-wise practice',
      },
    ],
  },
  {
    id: 'results',
    name: 'Results',
    href: '/results/test-session-123',
    icon: FiBarChart2,
    pattern: /^\/results/,
  },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const pathname = usePathname();

  // Hide navbar on exam pages to prevent distractions
  const isExamPage = pathname && (
    pathname.match(/^\/full-paper\/[^/]+\/[^/]+\/[^/]+$/) ||
    pathname.match(/^\/mini-quiz\/[^/]+\/[^/]+\/[^/]+\/[^/]+\/[^/]+$/)
  );

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Theme initialization
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && sysDark)) setIsDark(true);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  if (isExamPage) {
    return null;
  }

  const toggleDark = () => {
    setIsDark(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  const isActive = (item) =>
    item.pattern ? item.pattern.test(pathname) : item.href === pathname;

  return (
    <>
      {/* ─── Navbar bar ─── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1rem',
          background: scrolled
            ? 'color-mix(in srgb, var(--bg) 92%, transparent)'
            : 'var(--bg)',
          borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
          transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
        }}
      >
        <div style={{
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}>

          {/* Logo */}
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            textDecoration: 'none',
            minHeight: '44px',
            padding: '0 0.25rem',
          }}>
            <div style={{
              width: '36px', height: '36px',
              borderRadius: '10px',
              background: 'var(--accent-soft)',
              border: '1.5px solid rgba(21,101,192,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)',
              flexShrink: 0,
            }}>
              <FiBookOpen size={17} />
            </div>
            <span style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--text-1)',
              letterSpacing: '-0.02em',
            }}>
              QuizMaster
            </span>
          </Link>

          {/* Desktop nav */}
          <div style={{
            display: 'none',
            alignItems: 'center',
            gap: '0.25rem',
          }} className="desktop-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);

              if (item.dropdownItems) {
                return (
                  <div key={item.id} style={{ position: 'relative' }}>
                    <button
                      onClick={() => setOpenDropdown(p => p === item.id ? null : item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.5rem 0.875rem',
                        minHeight: '44px',
                        borderRadius: '10px',
                        border: 'none',
                        background: active ? 'var(--accent-soft)' : 'transparent',
                        color: active ? 'var(--accent)' : 'var(--text-2)',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        transition: 'background 0.2s, color 0.2s',
                        fontFamily: 'inherit',
                      }}
                      onMouseEnter={e => {
                        if (!active) { e.currentTarget.style.background = 'var(--bg-subtle)'; }
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = active ? 'var(--accent-soft)' : 'transparent';
                      }}
                    >
                      <Icon size={16} />
                      {item.name}
                      <FiChevronDown
                        size={14}
                        style={{
                          transform: openDropdown === item.id ? 'rotate(180deg)' : 'rotate(0)',
                          transition: 'transform 0.2s',
                        }}
                      />
                    </button>

                    {/* Dropdown */}
                    {openDropdown === item.id && (
                      <div style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        left: 0,
                        minWidth: '220px',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '14px',
                        boxShadow: 'var(--shadow-lg)',
                        overflow: 'hidden',
                        animation: 'scaleIn 0.15s ease-out',
                      }}>
                        {item.dropdownItems.map((d) => {
                          const DIcon = d.icon;
                          const dActive = d.pattern.test(pathname);
                          return (
                            <Link
                              key={d.id}
                              href={d.href}
                              onClick={() => setOpenDropdown(null)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.875rem 1rem',
                                minHeight: '52px',
                                textDecoration: 'none',
                                color: dActive ? 'var(--accent)' : 'var(--text-1)',
                                background: dActive ? 'var(--accent-soft)' : 'transparent',
                                transition: 'background 0.15s',
                                borderBottom: '1px solid var(--border)',
                              }}
                              onMouseEnter={e => {
                                if (!dActive) e.currentTarget.style.background = 'var(--bg-subtle)';
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.background = dActive ? 'var(--accent-soft)' : 'transparent';
                              }}
                            >
                              <DIcon size={16} style={{ color: dActive ? 'var(--accent)' : 'var(--text-2)', flexShrink: 0 }} />
                              <div>
                                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{d.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-2)' }}>{d.description}</div>
                              </div>
                              <FiChevronRight size={14} style={{ marginLeft: 'auto', color: 'var(--text-3)' }} />
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.5rem 0.875rem',
                    minHeight: '44px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    background: active ? 'var(--accent-soft)' : 'transparent',
                    color: active ? 'var(--accent)' : 'var(--text-2)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => {
                    if (!active) e.currentTarget.style.background = 'var(--bg-subtle)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = active ? 'var(--accent-soft)' : 'transparent';
                  }}
                >
                  <Icon size={16} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Theme toggle */}
            <button
              onClick={toggleDark}
              aria-label="Toggle theme"
              style={{
                width: '40px', height: '40px',
                minHeight: '44px',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--text-2)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--accent-soft)';
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.color = 'var(--accent)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--surface)';
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--text-2)';
              }}
            >
              {isDark
                ? <FiSun size={17} />
                : <FiMoon size={17} />
              }
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(p => !p)}
              aria-label="Toggle menu"
              className="mobile-menu-btn"
              style={{
                width: '40px', height: '40px',
                minHeight: '44px',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--text-2)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s',
                flexShrink: 0,
              }}
            >
              {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Mobile menu overlay ─── */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(4px)',
              animation: 'fadeIn 0.2s ease',
            }}
          />

          {/* Panel */}
          <div
            style={{
              position: 'absolute',
              top: '72px',
              left: '1rem',
              right: '1rem',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              boxShadow: 'var(--shadow-lg)',
              overflow: 'hidden',
              maxHeight: 'calc(100dvh - 88px)',
              overflowY: 'auto',
              animation: 'fadeUp 0.25s ease-out',
            }}
          >
            <div style={{ padding: '0.5rem' }}>
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item);

                if (item.dropdownItems) {
                  return (
                    <div key={item.id}>
                      <button
                        onClick={() => setOpenDropdown(p => p === item.id ? null : item.id)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.9rem 1rem',
                          minHeight: '56px',
                          borderRadius: '12px',
                          border: 'none',
                          background: active ? 'var(--accent-soft)' : 'transparent',
                          color: active ? 'var(--accent)' : 'var(--text-1)',
                          cursor: 'pointer',
                          fontSize: '0.9375rem',
                          fontWeight: 500,
                          textAlign: 'left',
                          fontFamily: 'inherit',
                        }}
                      >
                        <Icon size={18} style={{ color: active ? 'var(--accent)' : 'var(--text-2)', flexShrink: 0 }} />
                        <span style={{ flex: 1 }}>{item.name}</span>
                        <FiChevronDown
                          size={16}
                          style={{
                            color: 'var(--text-3)',
                            transform: openDropdown === item.id ? 'rotate(180deg)' : 'rotate(0)',
                            transition: 'transform 0.2s',
                          }}
                        />
                      </button>

                      {openDropdown === item.id && (
                        <div style={{
                          paddingLeft: '1rem',
                          paddingBottom: '0.25rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.125rem',
                        }}>
                          {item.dropdownItems.map((d) => {
                            const DIcon = d.icon;
                            const dActive = d.pattern.test(pathname);
                            return (
                              <Link
                                key={d.id}
                                href={d.href}
                                onClick={() => setMobileOpen(false)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.75rem',
                                  padding: '0.75rem 1rem',
                                  minHeight: '52px',
                                  borderRadius: '10px',
                                  textDecoration: 'none',
                                  background: dActive ? 'var(--accent-soft)' : 'transparent',
                                  color: dActive ? 'var(--accent)' : 'var(--text-1)',
                                }}
                              >
                                <DIcon size={16} style={{ color: dActive ? 'var(--accent)' : 'var(--text-2)', flexShrink: 0 }} />
                                <div>
                                  <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{d.name}</div>
                                  <div style={{ fontSize: '0.75rem', color: 'var(--text-2)' }}>{d.description}</div>
                                </div>
                                <FiChevronRight size={14} style={{ marginLeft: 'auto', color: 'var(--text-3)' }} />
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.9rem 1rem',
                      minHeight: '56px',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      background: active ? 'var(--accent-soft)' : 'transparent',
                      color: active ? 'var(--accent)' : 'var(--text-1)',
                      fontSize: '0.9375rem',
                      fontWeight: active ? 600 : 500,
                    }}
                  >
                    <Icon size={18} style={{ color: active ? 'var(--accent)' : 'var(--text-2)', flexShrink: 0 }} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Desktop nav CSS injection */}
      <style>{`
                @media (min-width: 1024px) {
                    .desktop-nav { display: flex !important; }
                    .mobile-menu-btn { display: none !important; }
                }
            `}</style>
    </>
  );
};

export default Navbar;