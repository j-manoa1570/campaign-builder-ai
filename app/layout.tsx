import AuthGuard from '../components/AuthGuard';
import SiteHeader from '../components/SiteHeader';
import './globals.css';

export const metadata = {
  title: 'Campaign Builder',
  description: 'Build and manage your campaigns with gothic style.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <AuthGuard>{children}</AuthGuard>
      </body>
    </html>
  )
}
