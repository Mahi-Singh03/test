/**
 * Layout for the quiz game pages — renders in full-screen exam mode.
 * Hides the global Navbar and removes padding so QuizEngine fills the viewport.
 */
export default function QuizGameLayout({ children }) {
    return (
        <>
            {/* Inject styles to hide the navbar and reset padding for exam mode */}
            <style>{`
        /* Hide navbar in exam center mode */
        nav[style*="position: fixed"] {
          display: none !important;
        }
        /* Remove main padding injected by root layout */
        main[style*="paddingTop"] {
          padding-top: 0 !important;
        }
        /* Override body overflow for full-screen exam */
        body {
          overflow: hidden;
        }
      `}</style>
            {children}
        </>
    );
}
