import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl">Educational Video Platform</h1>
        </header>
        <main className="p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
