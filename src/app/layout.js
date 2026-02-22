import './globals.css';
import Navbar from '../components/ui/navbar';

export const metadata = {
    title: 'QuizMaster — Prepare Smarter',
    description: 'Ace your exams with full question paper practice and topic-wise mini quizzes. Smart, mobile-first quiz application.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Prevent flash of wrong theme */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var saved = localStorage.getItem('theme');
                                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                                    if (saved === 'dark' || (!saved && prefersDark)) {
                                        document.documentElement.classList.add('dark');
                                    }
                                } catch(e) {}
                            })();
                        `,
                    }}
                />
            </head>
            <body>
                <Navbar />
                <main style={{ paddingTop: '30px' }}>{children}</main>
            </body>
        </html>
    );
}
