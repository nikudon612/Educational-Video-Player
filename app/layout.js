import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <header className="bg-blue-600 text-white p-4 mx-auto">
          <nav className="flex flex-row justify-between">
            <Link href="/">
              <h1 className="text-2xl">Educational Video Platform</h1>
            </Link>
            <div>
              <Link href="/videos/new">Add Video</Link>
            </div>
          </nav>
        </header>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
