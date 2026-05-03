import { GoogleOAuthProvider } from '@react-oauth/google'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`h-full antialiased`}
        >
            <body className="min-h-full flex flex-col" suppressHydrationWarning>
                <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID2!}>
                    {children}
                </GoogleOAuthProvider>
            </body>
        </html>
    );
}