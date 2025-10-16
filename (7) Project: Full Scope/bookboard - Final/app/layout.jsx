import "./globals.css"

export const metadata = {
  title: "BookBoard - Your Personal Library",
  description: "Manage your personal book library with ease"

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
