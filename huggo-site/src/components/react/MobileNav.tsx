import { useEffect, useCallback } from 'react';

/* -----------------------------------------------------------------------
   Bilingual navigation data
   ----------------------------------------------------------------------- */

const navItems = {
  fr: [
    { label: 'Accueil', href: '/' },
    { label: 'Retail', href: '/retail' },
    { label: 'Franchise', href: '/franchise' },
    { label: 'Collectivité', href: '/collectivite' },
    { label: 'Comment ça marche', href: '/comment-ca-marche' },
    { label: 'Tarifs', href: '/tarifs' },
    { label: 'À propos', href: '/a-propos' },
    { label: 'Contact', href: '/contact' },
  ],
  en: [
    { label: 'Home', href: '/en' },
    { label: 'Retail', href: '/en/retail' },
    { label: 'Franchise', href: '/en/franchise' },
    { label: 'Collectivity', href: '/en/collectivity' },
    { label: 'How it works', href: '/en/how-it-works' },
    { label: 'Pricing', href: '/en/pricing' },
    { label: 'About', href: '/en/about' },
    { label: 'Contact', href: '/en/contact' },
  ],
} as const;

const langLabels = {
  fr: { current: 'FR', other: 'EN', otherHref: '/en', srLabel: 'English' },
  en: { current: 'EN', other: 'FR', otherHref: '/', srLabel: 'Français' },
} as const;

const themeLabels = {
  fr: { light: 'Mode clair', dark: 'Mode sombre' },
  en: { light: 'Light mode', dark: 'Dark mode' },
} as const;

const closeLabel = { fr: 'Fermer le menu', en: 'Close menu' } as const;

/* -----------------------------------------------------------------------
   Props
   ----------------------------------------------------------------------- */

interface Props {
  locale: 'fr' | 'en';
  isOpen: boolean;
  onClose: () => void;
}

/* -----------------------------------------------------------------------
   Component
   ----------------------------------------------------------------------- */

export default function MobileNav({ locale, isOpen, onClose }: Props) {
  const items = navItems[locale];
  const lang = langLabels[locale];
  const theme = themeLabels[locale];

  /* Prevent body scroll when the overlay is open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /* Close on Escape key */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  /* Toggle dark mode */
  const toggleDarkMode = () => {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  /* Determine current theme for display (safe SSR default) */
  const isDark =
    typeof document !== 'undefined' &&
    document.documentElement.getAttribute('data-theme') === 'dark';

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <nav
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label={locale === 'fr' ? 'Navigation mobile' : 'Mobile navigation'}
        className={`fixed inset-y-0 right-0 z-50 flex w-[80vw] max-w-sm flex-col bg-[var(--bg-primary)] shadow-2xl transition-transform duration-300 ease-[var(--ease-out-expo)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between border-b border-[var(--border-color)] px-6 py-4">
          <span className="text-lg font-bold text-green-primary">HUGGO</span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--text-primary)] transition hover:bg-[var(--bg-secondary)]"
            aria-label={closeLabel[locale]}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation links */}
        <ul className="flex-1 overflow-y-auto px-6 py-4">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={onClose}
                className="block rounded-lg px-3 py-3 text-base font-medium text-[var(--text-primary)] transition hover:bg-green-primary/10 hover:text-green-primary"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Bottom controls */}
        <div className="border-t border-[var(--border-color)] px-6 py-5 space-y-4">
          {/* Language switcher */}
          <div className="flex items-center gap-3">
            <svg
              className="h-5 w-5 text-[var(--text-secondary)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a14.5 14.5 0 014 9 14.5 14.5 0 01-4 9 14.5 14.5 0 01-4-9 14.5 14.5 0 014-9z"
              />
            </svg>
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              {lang.current}
            </span>
            <a
              href={lang.otherHref}
              className="rounded-md border border-[var(--border-color)] px-3 py-1 text-sm text-[var(--text-secondary)] transition hover:border-green-primary hover:text-green-primary"
              aria-label={lang.srLabel}
            >
              {lang.other}
            </a>
          </div>

          {/* Dark mode toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--bg-secondary)]"
            aria-label={isDark ? theme.light : theme.dark}
          >
            {/* Sun icon */}
            <svg
              className={`h-5 w-5 transition ${isDark ? 'hidden' : 'block'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m8.485-9.485h-1M4.515 12h-1m14.849-5.364l-.707.707M6.343 17.657l-.707.707m12.021 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
              />
            </svg>
            {/* Moon icon */}
            <svg
              className={`h-5 w-5 transition ${isDark ? 'block' : 'hidden'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
              />
            </svg>
            <span>{isDark ? theme.light : theme.dark}</span>
          </button>
        </div>
      </nav>
    </>
  );
}
