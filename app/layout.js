import './globals.css';

export const metadata = {
    title: 'Quiz App - Test UI',
    description: 'Testing routing and navigation',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
