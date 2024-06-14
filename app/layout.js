import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <header className="text-black p-4 mx-auto">
          <nav className="flex flex-row justify-between">
            <Link href="/">
              <img src="/FULL_LOGO_COLOR.png" alt="Logo" className="w-32" />
            </Link>
            <div>
              <Link href="/videos/new" className="text-3xl text-gray-600" alt="Upload video">+</Link>
            </div>
          </nav>
        </header>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
