import './globals.css';
import Navbar from '../components/ui/navbar';

export const metadata = {
    title: 'Quiz App - Test UI',
    description: 'Testing routing and navigation',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <main className="min-h-screen pt-16 lg:pt-20">
                    {children}
                </main>
            </body>
        </html>
    );
}
