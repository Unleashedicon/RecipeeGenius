import Navbar from "../components/navbar";
import Providers from "../components/providers";
import "./globals.css";
import { ThemeProvider } from 'next-themes';
import '@fontsource/lobster-two';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Progress } from "@/components/ui/progress";
import { UserfrontProvider } from "@userfront/next/client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
      <UserfrontProvider
          tenantId={process.env.NEXT_PUBLIC_USERFRONT_WORKSPACE_ID}
        >
        <ThemeProvider attribute="class">
          <Providers>
            <Navbar />
            <ToastContainer />
            <Progress />
            {children}
            <div className="grow" />
          </Providers>
        </ThemeProvider>
      </UserfrontProvider>
      </body>
    </html>
  );
}
