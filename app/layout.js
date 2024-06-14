import "./globals.css";
import Navbar from "./components/Navbar"; // Importing the Navbar component

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
