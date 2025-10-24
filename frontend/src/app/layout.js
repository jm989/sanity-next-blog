import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Touchline Epiphanies",
  description: "Football takes, code notes, and assorted brain dumps.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="bg-zinc-950 text-zinc-100 font-sans antialiased"
      >
        <header className="border-b border-zinc-800">
          <div className="max-w-4xl mx-auto p-6 flex items-center justify-between">
            <a href="/" className="text-2xl font-bold tracking-tight">
              Touchline Epiphanies
            </a>
            {/* Future nav goes here */}
          </div>
        </header>
        <main className="max-w-4xl mx-auto p-6">{children}</main>
        <footer className="border-t border-zinc-800">
          <div className="max-w-4xl mx-auto p-6 text-center text-sm text-zinc-500">
            © {new Date().getFullYear()} Javio
          </div>
        </footer>
      </body>
    </html>
  );
}
