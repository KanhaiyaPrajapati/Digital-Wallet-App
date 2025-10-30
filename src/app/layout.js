import "./globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata = { title: "Digital Wallet App" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto p-4">
          {children}
          <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#111827",
              color: "#fff",
              borderRadius: "10px",
              padding: "12px 16px",
              fontSize: "0.9rem",
            },
            success: { iconTheme: { primary: "#22c55e", secondary: "#fff" } },
            error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
          }}
        />
        </main>
      </body>
    </html>
  );
}
